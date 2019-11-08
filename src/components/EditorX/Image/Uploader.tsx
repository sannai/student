import React, { FC, MouseEvent, ChangeEvent } from 'react'
import styled from '@emotion/styled'
import Cookies from 'js-cookie'
import { Editor } from 'slate-react'

const Container = styled.input`
    display: none;
`

function insertImage(editor: any, src: any, target: any) {
    if (target) {
        editor.select(target)
    }

    editor.insertInline({
        type: 'image',
        data: { src },
    })
}

interface IProps {
    editor: Editor | null
}

const Uploader: FC<IProps> = props => {
    const handleClick = (event: MouseEvent) => {
        // @ts-ignore
        event.target.value = null
    }
    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target
        const file = files![0]
        console.log(file)
        const url = 'https://upload-z2.qiniup.com'
        let body = new FormData()
        body.append('file', file)
        body.append('token', Cookies.get('uploadToken') + '')
        body.append('key', new Date().getTime() + '.' + file.name.split('.').pop())
        fetch(url, {
            method: 'POST',
            body: body,
        })
            .then(res => res.json())
            .then(data => {
                console.log(data, insertImage, props)
                props.editor!.command(insertImage, `https://img2.heartdynamic.cn/${data.key}`)
            })
    }
    return (
        <Container
            onClick={handleClick}
            type='file'
            accept='image/*'
            onChange={handleFileUpload}
            id='editor-image-input'
        />
    )
}

export default Uploader
