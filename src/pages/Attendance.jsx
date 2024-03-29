import { Box, Text, Button, HStack } from "@chakra-ui/react";
import { usePagination } from "@ajna/pagination";
import Layout from "../components/Layout";
import TablePagination from "../components/Tables/TablePagination";
import TableAttendance from "../components/Tables/TableAttendance";

const Attendance = () => {
  const {
    pages,
    pagesCount,
    // offset,
    currentPage,
    setCurrentPage,
    // pageSize,
    setPageSize,
  } = usePagination({
    total: 0,
    limits: {
      outer: 1,
      inner: 1,
    },
    initialState: {
      pageSize: 10,
      currentPage: 1,
    },
  });

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const attendanceData = [
    {
      id: "1",
      fullName: "Budi Gunawan",
      role: "programmer",
      clockIn: "2024-03-18T02:00:00.000Z",
      pointIn: "POINT(-7.3013141 108.7712909)",
      clockOut: "2024-03-18T10:00:00.000Z",
      pointOut: "POINT(-7.3013141 108.7712909)",
    },
    {
      id: "2",
      fullName: "Budi Gunawan",
      role: "programmer",
      clockIn: "2024-03-19T02:00:00.000Z",
      pointIn: "POINT(-7.3013141 108.7712909)",
      clockOut: "2024-03-19T10:00:00.000Z",
      pointOut: "POINT(-7.3013141 108.7712909)",
    },
    {
      id: "3",
      fullName: "Budi Gunawan",
      role: "programmer",
      clockIn: "2024-03-20T02:00:00.000Z",
      pointIn: "POINT(-7.3013141 108.7712909)",
      clockOut: "",
      pointOut: "",
    },
  ];

  return (
    <Layout>
      <Box padding='22px' backgroundColor='white' borderRadius='15px'>
        <HStack
          width='100%'
          padding='6px 0 22px'
          justifyContent='space-between'
        >
          <Text as='h2' fontWeight='bold' fontSize='large'>
            Attendace Table
          </Text>
          <Button colorScheme='blue'>Add Presence</Button>
        </HStack>
        <TableAttendance data={attendanceData} />
        <TablePagination
          pages={pages}
          pagesCount={pagesCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </Box>
    </Layout>
  );
};

export default Attendance;
