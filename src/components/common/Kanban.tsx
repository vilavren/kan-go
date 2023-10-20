import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import { ChangeEvent } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
  fetchCreateSection,
  fetchDeleteSection,
  fetchUpdateSection,
  sectionsActions,
} from '../../store/sections/sections.slice'
import { AppDispatch, RootState } from '../../store/store'

let timerInput: NodeJS.Timeout
const timeout: number = 500

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

  const updateSectionTitle = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    sectionId: string
  ) => {
    clearTimeout(timerInput)
    const newTitle = e.target.value
    const newSectionsItems = [...sections.items]
    const index = newSectionsItems.findIndex((e) => e.id === sectionId)
    const updatedSection = { ...newSectionsItems[index], title: newTitle }
    newSectionsItems[index] = updatedSection
    dispatch(sectionsActions.setSections(newSectionsItems))

    timerInput = setTimeout(async () => {
      try {
        if (boardsId) {
          dispatch(
            fetchUpdateSection({
              boardId: boardsId,
              sectionId: sectionId,
              params: { title: newTitle },
            })
          )
        }
      } catch (error) {
        alert(error)
      }
    }, timeout)
  }

  const createTask = () => {}

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
            <div key={section.id} style={{ width: '340px' }}>
              <Droppable key={section.id} droppableId={section.id}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      width: '340px',
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
                        onChange={(e) => updateSectionTitle(e, section.id)}
                        placeholder="Заголовок..."
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
                        onClick={() => createTask()}
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
                    {section.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              padding: '10px',
                              marginBottom: '10px',
                              cursor: snapshot.isDragging
                                ? 'grab'
                                : 'pointer!important',
                            }}
                          >
                            <Typography>
                              {task.title === '' ? 'Без названия' : task.title}
                            </Typography>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
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
