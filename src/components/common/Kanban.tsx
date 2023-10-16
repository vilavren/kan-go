import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
  fetchCreateSection,
  fetchDeleteSection,
  sectionsActions,
} from '../../store/sections/sections.slice'
import { AppDispatch, RootState } from '../../store/store'

export const Kanban = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { sections } = useSelector((s: RootState) => s.sections)
  const { boardsId } = useParams<string>()

  const onDragEnd = () => {}

  const createSection = () => {
    if (boardsId) {
      dispatch(fetchCreateSection(boardsId))
    }
  }

  const deleteSection = (sectionId: string) => {
    if (boardsId) {
      dispatch(fetchDeleteSection({ boardId: boardsId, sectionId: sectionId }))
    }
    const newSections = [...sections.items].filter((e) => e.id !== sectionId)
    dispatch(sectionsActions.setSections(newSections))
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Button onClick={createSection}>Добавить раздел</Button>
        <Typography variant="body2" fontWeight="700">
          разделов: {sections.items.length}
        </Typography>
      </Box>
      <Divider sx={{ margin: '10px 0' }} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            width: 'calc(100vw - 400px)',
            overflowX: 'auto',
          }}
        >
          {sections.items.map((section) => (
            <div key={section.id} style={{ width: '300px' }}>
              <Droppable key={section.id} droppableId={section.id}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      width: '300px',
                      padding: '10px',
                      marginRight: '10px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                      }}
                    >
                      <TextField
                        value={section.title}
                        placeholder="Untitled"
                        variant="outlined"
                        sx={{
                          flexGrow: 1,
                          '& .MuiOutlinedInput-input': { padding: 0 },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'unset ',
                          },
                          '& .MuiOutlinedInput-root': {
                            fontSize: '1rem',
                            fontWeight: '700',
                          },
                        }}
                      />
                      <IconButton
                        size="small"
                        sx={{
                          color: 'gray',
                          '&:hover': { color: 'green' },
                        }}
                      >
                        <AddCircleOutlineOutlinedIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          color: 'gray',
                          '&:hover': { color: 'red' },
                        }}
                        onClick={() => deleteSection(section.id)}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </Droppable>
            </div>
          ))}
        </Box>
      </DragDropContext>
    </>
  )
}
