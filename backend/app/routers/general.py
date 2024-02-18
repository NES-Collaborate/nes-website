from pathlib import Path

from app.models.user import Attach, User
from app.services.db import get_session
from app.services.settings import Settings
from app.services.user import UserService
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from fastapi.responses import FileResponse
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

    save_path = _path / filename

    # TODO: Improve this code and make more secure and efficient to save the file
    # 1. The file must be saved usign async ietartor over the file chunks (1024 bytes)
    # 2. Securely rewrite the filename (especial characters using regex and more)
    with open(save_path, "wb") as f:
        f.write(await data.read())

    _attach = Attach(name=str(filename), location=str(save_path), type="File")
    session.add(_attach)
    session.commit()
    session.refresh(_attach)

    return {"id": _attach.id}


@router.get("/attachments/{attach_id}", status_code=status.HTTP_200_OK)
async def get_attachments(
        attach_id: int,
        session: Session = Depends(get_session),
):

    _attach = session.query(Attach).get(attach_id)

    if not _attach:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Anexo não encontrado",
        )

    _path = Path(_attach.location)
    if not _path.is_file():
        _path /= _attach.name

    if not _path.is_file():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Anexo não encontrado",
        )

    return FileResponse(_path,
                        filename=_attach.name,
                        content_disposition_type="inline")
