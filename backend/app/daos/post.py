from typing import List, Optional, Tuple

from sqlalchemy import or_
from sqlalchemy.orm import joinedload

from app.models.classroom import Post

from .base import BaseDao


class PostDao(BaseDao):
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
            .filter(Post.classromId.in_(classroom_ids))
        )

        if subject_id:
            query = query.filter(Post.classromId == subject_id)

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
