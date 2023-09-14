
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue
} from '@chakra-ui/react'
// Assets
// Custom components
import MiniCalendar from 'components/calendar/MiniCalendar'
import MiniStatistics from 'components/card/MiniStatistics'
import IconBox from 'components/icons/IconBox'
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy
} from 'react-icons/md'
import CheckTable from 'views/admin/default/components/CheckTable'
import ComplexTable from 'views/admin/default/components/ComplexTable'
import DailyTraffic from 'views/admin/default/components/DailyTraffic'
import PieCard from 'views/admin/default/components/PieCard'
import Tasks from 'views/admin/default/components/Tasks'
import TotalSpent from 'views/admin/default/components/TotalSpent'
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue'
import Banner from 'views/admin/profile/components/Storage'
import {
  columnsDataCheck,
  columnsDataComplex,
  TableData
} from 'views/admin/default/variables/columnsData'
import tableDataCheck from 'views/admin/default/variables/tableDataCheck.json'
import tableDataComplex from 'views/admin/default/variables/tableDataComplex.json'
import { isWindowAvailable } from 'utils/navigation'
import AdminLayout from 'layouts/admin'
import { Image } from 'components/image/Image'
import Usa from 'img/dashboards/usa.png'

export default function UserReports() {
  // Chakra Color Mode

  const brandColor = useColorModeValue('brand.500', 'white')
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')

  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <>
          <Flex columns={{ base: 1, md: 2, xl: 2 }} mb='20px'>
            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
              <DailyTraffic />
              <CheckTable columnsData={columnsDataCheck} tableData={(tableDataCheck as unknown) as TableData[]} />
              <Banner />
            </SimpleGrid>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
            <ComplexTable
              columnsData={columnsDataComplex}
              tableData={(tableDataComplex as unknown) as TableData[]}
            />
            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
              <Tasks />
              <MiniCalendar h='100%' minW='100%' selectRange={false} />
            </SimpleGrid>
          </SimpleGrid>
        </>
      </Box>
    </AdminLayout>
  )
}
