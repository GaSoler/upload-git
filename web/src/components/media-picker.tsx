'use client'

import { ChangeEvent, useState } from "react"

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileType, setFileType] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const fileType = files[0].type.split('/')[1]
    setFileType(fileType)

    const previewUrl = URL.createObjectURL(files[0])
    setPreview(previewUrl)
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        name="coverUrl"
        id="media"
        accept="image/*"
        className="invisible h-0 w-0"
      />
      {preview &&
        (fileType?.includes('mp') ? (
          <video
            src={preview}
            controls
            className="aspect-video w-full rounded-lg object-cover"
          />
        ) : (
          <img
            src={preview}
            alt=""
            className="aspect-video w-full rounded-lg object-contain"
          />
        ))}
    </>
  )
}