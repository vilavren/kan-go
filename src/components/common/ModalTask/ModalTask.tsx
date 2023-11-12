import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/ru'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { EventInfo } from '@ckeditor/ckeditor5-utils'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import {
  Box,
  Divider,
  Fade,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { sectionsActions } from '../../../store/sections/sections.slice'
import { ITask } from '../../../store/sections/sections.types'
import {
  fetchDeleteTask,
  fetchUpdateTask,
} from '../../../store/sections/tasks.asyncActions'
import { AppDispatch } from '../../../store/store'
import './ModalTask.css'

const stylesModal = {
  outline: 'none',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 1,
  height: '95%',
}

let timerInput: NodeJS.Timeout
const timeout: number = 500
let isModalOpen: boolean = false

const ModalTask = ({
  selectTask,
  boardId,
  onCloseTask,
}: {
  selectTask: ITask | undefined
  boardId: string | undefined
  onCloseTask: () => void
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const [task, setTask] = useState<ITask | undefined>(selectTask)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    setTask(selectTask)
    setTitle(selectTask !== undefined ? selectTask.title : '')
    setContent(selectTask !== undefined ? selectTask.content : '')
    if (selectTask !== undefined) {
      isModalOpen = true
    }
  }, [selectTask])

  const onClose = () => {
    isModalOpen = false
    onCloseTask()
  }

  const deleteTask = () => {
    if (boardId && task) {
      dispatch(sectionsActions.deleteTask(task))
      dispatch(
        fetchDeleteTask({
          boardId: boardId,
          taskId: task.id,
        })
      )
      setTask(undefined)
    }
  }

  const updateTitle = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerInput)
    if (boardId && task) {
      const newTitle = e.target.value
      const tempTask = { ...task, title: newTitle }

      setTitle(newTitle)
      dispatch(sectionsActions.updateTask(tempTask))

      timerInput = setTimeout(() => {
        dispatch(
          fetchUpdateTask({
            boardId: boardId,
            taskId: task?.id,
            params: { title: newTitle },
          })
        )
      }, timeout)
    }
  }

  const updateContent = (
    _e: EventInfo<string, unknown>,
    editor: ClassicEditor
  ) => {
    clearTimeout(timerInput)
    const data: string = editor.getData()

    if (isModalOpen && boardId && task) {
      const tempTask = { ...task, content: data }

      setContent(data)
      dispatch(sectionsActions.updateTask(tempTask))

      timerInput = setTimeout(() => {
        dispatch(
          fetchUpdateTask({
            boardId: boardId,
            taskId: task?.id,
            params: { content: data },
          })
        )
      }, timeout)
    }
  }

  return (
    <Modal open={task !== undefined} onClose={onClose} closeAfterTransition>
      <Fade in={task !== undefined}>
        <Box sx={stylesModal}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <IconButton color="error" onClick={deleteTask}>
              <DeleteOutlineIcon />
            </IconButton>
            <IconButton onClick={onClose}>
              <HighlightOffOutlinedIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              padding: '1rem',
            }}
          >
            <TextField
              value={title}
              onChange={updateTitle}
              placeholder="Без названия..."
              variant="outlined"
              fullWidth
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-input': { padding: 0 },
                '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                '& .MuiOutlinedInput-root': {
                  fontSize: '1.5rem',
                  fontWeight: '700',
                },
                marginBottom: '10px',
              }}
            />
            <Typography variant="body2" fontWeight="700">
              {/* Дата  */}
            </Typography>
            <Divider sx={{ margin: '0.5rem 0' }} />
            <Box
              sx={{
                position: 'relative',
                height: '80%',
                overflowX: 'hidden',
                overflowY: 'auto',
              }}
            >
              <CKEditor
                config={{ language: 'ru' }}
                editor={ClassicEditor}
                data={content}
                onChange={updateContent}
              />
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ModalTask
