import { Flex, Box, Text } from "@chakra-ui/react";
import { usePagination } from "@ajna/pagination";
import Layout from "../components/Layout";
import TableEmployee from "../components/Tables/TableEmployee";
import TablePagination from "../components/Tables/TablePagination";

const Employee = () => {
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

  const employeeData = [
    {
      id: "1",
      name: "John Doe",
      role: "Programmer",
      isActive: true,
      employed: "2020-07-31T03:24:00",
      email: "johndoe@mail.com",
      phone: "+62123456789",
    },
    {
      id: "2",
      name: "Jessica Jane",
      role: "Programmer",
      isActive: false,
      employed: "2020-07-31T03:24:00",
      email: "jessicajane@mail.com",
      phone: "+62123456789",
    },
    {
      id: "3",
      name: "Budi Gunawan",
      role: "Programmer",
      isActive: true,
      employed: "2020-07-31T03:24:00",
      email: "budigunawan@mail.com",
      phone: "+62123456789",
    },
  ];

  return (
    <Layout>
      <Box padding='22px' backgroundColor='white' borderRadius='15px'>
        <Flex width='100%' padding='6px 0 22px'>
          <Text as='h2' fontWeight='bold' fontSize='large'>
            Employee Table
          </Text>
        </Flex>
        <TableEmployee data={employeeData} />
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

export default Employee;
