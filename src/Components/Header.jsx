import { Box, Typography, useTheme } from '@mui/material'
import {tokens} from "../theme"

const Header = ({title, subtitle}) => {
    const tema = useTheme();
    const kulay = tokens(tema.palette.mode);

  return (
    <Box mb="20px">
        <Typography
           variant="h2"
           color={kulay.grey[100]}
           fontWeight="bold"
           sx={{mb:"5px"}}
        >
            {title}
        </Typography>
        <Typography
            variant="h5"
            color={kulay.greenAccent[200]}
            fontStyle="italic"
        >
            {subtitle}
        </Typography>
    </Box>
  )
}

export default Header