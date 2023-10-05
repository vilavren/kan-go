import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Box, Typography } from '@mui/material'
import { BaseEmoji } from 'emoji-mart/dist-es'
import { useState, useEffect } from 'react'

interface EmojiPickerProps {
  icon: string | undefined
  onChange: (emoji: string) => void
}

export const EmojiPicker = ({
  icon,
  onChange,
}: EmojiPickerProps): JSX.Element => {
  const [selectedEmoji, setSelectedEmoji] = useState<string | undefined>()
  const [isShowPicker, setIsShowPicker] = useState(false)

  useEffect(() => {
    setSelectedEmoji(icon)
  }, [icon])

  const selectEmoji = (e: BaseEmoji) => {
    const sym = e.unified.split('-')
    const codesArray: number[] = sym.map((el: string) =>
      parseInt(`0x${el}`, 16)
    )
    const emoji = String.fromCodePoint(...codesArray)
    setIsShowPicker(false)
    onChange(emoji)
  }

  const showPicker = () => setIsShowPicker((prevState) => !prevState)

  return (
    <Box sx={{ position: 'relative', width: 'max-content' }}>
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: 'pointer' }}
        onClick={showPicker}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? 'block' : 'none',
          position: 'absolute',
          top: '100%',
          zIndex: 9999,
        }}
      >
        <Picker
          data={data}
          theme="dark"
          onSelect={selectEmoji}
          showPreview={false}
        />
      </Box>
    </Box>
  )
}
