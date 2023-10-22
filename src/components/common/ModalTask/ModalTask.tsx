import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/ru'
import { CKEditor } from '@ckeditor/ckeditor5-react'
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
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { sectionsActions } from '../../../store/sections/sections.slice'
import { ITask } from '../../../store/sections/sections.types'
import { fetchDeleteTask } from '../../../store/sections/tasks.asyncActions'
import { AppDispatch } from '../../../store/store'

const stylesModal = {
  outline: 'none',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '85%',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 1,
  height: '95%',
}

export const ModalTask = ({
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
  }, [selectTask])

  const onClose = () => {
    onCloseTask()
    if (task) {
      dispatch(sectionsActions.updateTask(task))
    }
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
              padding: '1rem 2rem 2rem',
            }}
          >
            <TextField
              value={title}
              // onChange={updateTitle}
              placeholder="Без названия..."
              variant="outlined"
              fullWidth
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-input': { padding: 0 },
                '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                '& .MuiOutlinedInput-root': {
                  fontSize: '2.5rem',
                  fontWeight: '700',
                },
                marginBottom: '10px',
              }}
            />
            <Typography variant="body2" fontWeight="700">
              {/* Дата  */}
            </Typography>
            <Divider sx={{ margin: '1.5rem 0' }} />
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
              />
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}
