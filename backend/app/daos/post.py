from typing import List, Optional, Tuple, Union

from fastapi import HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import joinedload

from app.models.classroom import Activity, Post, PostAttachment
from app.models.common import Response
from app.schemas.classroom import ActivityPostIn, PostIn, ResponsePostIn

from .base import BaseDao


class PostDao(BaseDao):

    def get_by_id(self, postId: int) -> Post:
        _post = self.session.query(Post).get(postId)

        if not _post:
            raise HTTPException(status_code=404, detail="Post não encontrado")

        return _post

    def get_posts(
        self,
        classroom_ids: List[int],
        page: int,
        page_size: int,
        subject_id: Optional[int] = None,
        search_query: Optional[str] = None,
    ) -> Tuple[List[Post], int]:
        query = (
            self.session.query(Post)
            .options(joinedload(Post.classroom))
            .filter(Post.classroomId.in_(classroom_ids))
        )

        if subject_id:
            query = query.filter(Post.classroomId == subject_id)

        if search_query:
            query = query.filter(
                or_(
                    Post.title.ilike(f"%{search_query}%"),
                    Post.content.ilike(f"%{search_query}%"),
                )
            )

        total = query.count()

        posts = (
            query.order_by(Post.createdAt)
            .offset((page - 1) * page_size)
            .limit(page_size)
            .all()
        )

        return posts, total

    def _create_post(
        self,
        post: Union[PostIn, ActivityPostIn, ResponsePostIn],
        classroomId: int,
        userId: int,
    ) -> Post:
        _post = Post(
            classroomId=classroomId,
            addedById=userId,
            title=post.title,
            content=post.content,
            type=post.type,
        )

        if post.attachments:
            _post.attachments = (
                self.session.query(PostAttachment)
                .filter(PostAttachment.id.in_(post.attachments))
                .all()
            )

        self.session.add(_post)
        self.session.commit()
        self.session.refresh(_post)

        return _post

    def create_notice(self, post: PostIn, classroomId: int, userId: int) -> Post:
        return self._create_post(post, classroomId, userId)

    def create_lecture(self, post: PostIn, classroomId: int, userId: int) -> Post:
        return self._create_post(post, classroomId, userId)

    def create_activity(
        self, post: ActivityPostIn, classroomId: int, userId: int
    ) -> Post:
        _post = self._create_post(post, classroomId, userId)

        # TODO: Create or Add (?) Activity Group

        _activity = Activity(
            postId=_post.id,
            startDate=post.startDate,
            endDate=post.endDate,
            maxGrade=post.maxGrade,
            linearCoefficient=post.linearCoefficient,
            angularCoefficient=post.angularCoefficient,
            weight=post.weight,
        )

        self.session.add(_activity)
        self.session.commit()

        self.session.refresh(_post)

        return _post

    def create_test(self, post: ActivityPostIn, classroomId: int, userId: int) -> Post:
        return self.create_activity(post, classroomId, userId)

    def create_response(
        self, post: ResponsePostIn, classroomId: int, userId: int
    ) -> Post:
        _post = self._create_post(post, classroomId, userId)

        _response = Response(
            postId=_post.id, activityId=post.activityId, grade=post.grade
        )

        self.session.add(_response)
        self.session.commit()

        self.session.refresh(_post)

        return _post

    def _update_post(
        self, postId: int, post: Union[PostIn, ActivityPostIn, ResponsePostIn]
    ) -> Post:
        _post = self.get_by_id(postId)

        _post.title = post.title
        _post.content = post.content

        if post.attachments:
            _post.attachments = (
                self.session.query(PostAttachment)
                .filter(PostAttachment.id.in_(post.attachments))
                .all()
            )

        self.session.commit()
        self.session.refresh(_post)

        return _post

    def update_notice(self, postId: int, post: PostIn) -> Post:
        return self._update_post(postId, post)

    def update_lecture(self, postId: int, post: PostIn) -> Post:
        return self._update_post(postId, post)

    def update_activity(self, postId: int, post: ActivityPostIn) -> Post:

        _post = self._update_post(postId, post)

        ACTIVITY_KEYS = [
            "startDate",
            "endDate",
            "maxGrade",
            "linearCoefficient",
            "angularCoefficient",
            "weight",
        ]

        if _post.activity:
            for key, value in post.model_dump().items():
                if key in ACTIVITY_KEYS:
                    setattr(_post.activity, key, value)

        self.session.commit()
        self.session.refresh(_post)

        return _post

    def update_test(self, postId: int, post: ActivityPostIn) -> Post:
        return self.update_activity(postId, post)

    def update_response(self, postId: int, post: ResponsePostIn) -> Post:
        _post = self._update_post(postId, post)

        if _post.response:
            _post.response.activityId = post.activityId
            _post.response.grade = post.grade

        self.session.commit()
        self.session.refresh(_post)

        return _post

    def delete_by_id(self, postId: int):
        _post = self.get_by_id(postId)
        self.session.delete(_post)
        self.session.commit()
