import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  HStack,
  useDisclosure,
  useBoolean,
  Spinner,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { usePagination } from "@ajna/pagination";
import Layout from "../components/Layout";
import TableEmployee from "../components/Tables/TableEmployee";
import TablePagination from "../components/Tables/TablePagination";
import ModalCreateEmployee from "../components/Modals/ModalCreateEmployee";
import { FaPlus } from "react-icons/fa6";

const Employee = () => {
  const [filterData, setFilterData] = useState({
    page: 1,
    limit: 10,
  });
  const [employees, setEmployees] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useBoolean(true);
  const { accessToken } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;

  const {
    pages,
    pagesCount,
    currentPage,
    setCurrentPage,
    pageSize,
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

  const {
    isOpen: isOpenModalCreateEmployee,
    onOpen: onOpenModalCreateEmployee,
    onClose: onCloseModalCreateEmployee,
  } = useDisclosure();

  const handleChangePage = (nextPage) => {
    setCurrentPage(nextPage);
    setFilterData({ page: nextPage, ...filterData });
  };

  const handleChangePageSize = (newPageSize) => {
    setPageSize(newPageSize);
    setFilterData({ limit: newPageSize, ...filterData });
  };

  const revalidateEmployees = async () => {
    try {
      setIsLoading.on();
      const response = await axios.get(`${apiUrl}/api/v1/users/list`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setEmployees(response.data);
    } catch (err) {
      console.error(err);
      setErrorMessage(err?.response?.data?.message || "Server Error");
    } finally {
      setIsLoading.off();
    }
  };

  useEffect(() => {
    const getEmployees = async () => {
      try {
        setIsLoading.on();
        const response = await axios.get(`${apiUrl}/api/v1/users/list`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setEmployees(response.data);
      } catch (err) {
        console.error(err);
        setErrorMessage(err?.response?.data?.message || "Server Error");
      } finally {
        setIsLoading.off();
      }
    };

    getEmployees();
  }, [accessToken, apiUrl, setIsLoading]);

  return (
    <Layout>
      <Box padding="22px" backgroundColor="white" borderRadius="15px">
        <HStack
          width="100%"
          padding="6px 0 22px"
          justifyContent="space-between"
        >
          <Text as="h2" fontWeight="bold" fontSize="large">
            Employee Table
          </Text>
          <Button
            leftIcon={<FaPlus />}
            colorScheme="blue"
            onClick={onOpenModalCreateEmployee}
          >
            Employee
          </Button>
        </HStack>
        <Center minH="200px">
          {isLoading && <Spinner />}
          {!isLoading && employees?.data.length !== 0 && (
            <TableEmployee employees={employees.data} />
          )}
          {!isLoading && errorMessage && <Text>{errorMessage}</Text>}
        </Center>
        <TablePagination
          pages={pages}
          pagesCount={pagesCount}
          currentPage={currentPage}
          onPageChange={handleChangePage}
          onPageSizeChange={handleChangePageSize}
          pageSize={pageSize}
        />
      </Box>
      <ModalCreateEmployee
        isOpen={isOpenModalCreateEmployee}
        onClose={onCloseModalCreateEmployee}
        revalidateEmployees={revalidateEmployees}
      />
    </Layout>
  );
};

export default Employee;
