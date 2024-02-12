from pathlib import Path

from app.models.user import Attach, User
from app.services.db import get_session
from app.services.settings import Settings
from app.services.user import UserService
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

router = APIRouter()


@router.post("/upload")
async def upload_file(
        data: UploadFile = File(...),
        current_user: User = Depends(UserService.get_current_user),
        session: Session = Depends(get_session),
):

    # TODO: ext validation by mimetype
    filename = Path(data.filename if data.filename else "unknown.jpg")

    if filename.suffix.removeprefix(".") not in ("png", "jpg", "jpeg", "gif"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Arquivo inválido",
        )

    _path = Path(Settings.UPLOADS_PATH) / str(current_user.id)

    _path.mkdir(parents=True, exist_ok=True)

    # TODO: Improve this code and make more secure and efficient to save the file
    # 1. The file must be saved usign async ietartor over the file chunks (1024 bytes)
    # 2. Securely rewrite the filename (especial characters using regex and more)
    with open(_path / filename, "wb") as f:
        f.write(await data.read())

    _attach = Attach(name=data.filename,
                     location=str(_path),
                     type="file",
                     user_id=current_user.id)
    session.add(_attach)
    session.commit()
    session.refresh(_attach)

    return {"id": _attach.id}
