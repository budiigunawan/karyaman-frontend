import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Text,
  Button,
  HStack,
  useDisclosure,
  useBoolean,
  Center,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { usePagination } from "@ajna/pagination";
import Layout from "../components/Layout";
import TablePagination from "../components/Tables/TablePagination";
import TableAttendance from "../components/Tables/TableAttendance";
import { FaPlus } from "react-icons/fa6";
import ModalAttendance from "../components/Modals/ModalAttendance";

const Attendance = () => {
  const [filterData, setFilterData] = useState({
    page: 1,
    limit: 10,
  });
  const [attendances, setAttendances] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useBoolean(true);
  const { accessToken, user } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;

  const {
    pages,
    pagesCount,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
  } = usePagination({
    total: attendances?.totalData || 0,
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
    isOpen: isOpenModalCreateAttendance,
    onOpen: onOpenModalCreateAttendance,
    onClose: onCloseModalCreateAttendance,
  } = useDisclosure();

  const handleChangePage = (nextPage) => {
    setCurrentPage(nextPage);
    setFilterData({ page: nextPage, limit: filterData.limit });
  };

  const handleChangePageSize = (newPageSize) => {
    setPageSize(newPageSize);
    setFilterData({ limit: newPageSize, page: filterData.page });
  };

  const revalidateAttendances = async () => {
    try {
      setIsLoading.on();
      const response = await axios.get(
        `${apiUrl}/api/v1/attendance/list?page=${filterData.page}&limit=${filterData.limit}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setAttendances(response.data);
    } catch (err) {
      console.error(err);
      setErrorMessage(err?.response?.data?.message || "Server Error");
    } finally {
      setIsLoading.off();
    }
  };

  const isClockedIdToday = useMemo(() => {
    if (user?.data && attendances?.data?.length) {
      let currentUserAttendances;

      if (user.data.isAdmin) {
        currentUserAttendances = attendances.data.filter(
          (attendance) => attendance.userId === user.data.id,
        );
      } else {
        currentUserAttendances = attendances.data;
      }

      const todayAttendance = currentUserAttendances.find(
        (attendance) =>
          new Date(attendance.clockIn).toISOString().split("T")[0] ===
          new Date().toISOString().split("T")[0],
      );

      return !!todayAttendance;
    }
  }, [user.data, attendances.data]);

  useEffect(() => {
    const getAttendances = async () => {
      try {
        setIsLoading.on();
        const response = await axios.get(
          `${apiUrl}/api/v1/attendance/list?page=${filterData.page}&limit=${filterData.limit}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        setAttendances(response.data);
      } catch (err) {
        console.error(err);
        setErrorMessage(err?.response?.data?.message || "Server Error");
      } finally {
        setIsLoading.off();
      }
    };

    getAttendances();
  }, [accessToken, apiUrl, setIsLoading, filterData]);

  return (
    <Layout>
      <Box padding="22px" backgroundColor="white" borderRadius="15px">
        <HStack
          width="100%"
          padding="6px 0 22px"
          justifyContent="space-between"
        >
          <Text as="h2" fontWeight="bold" fontSize="large">
            Attendace Table
          </Text>
          <Button
            leftIcon={<FaPlus />}
            colorScheme="blue"
            onClick={onOpenModalCreateAttendance}
            isDisabled={isLoading || isClockedIdToday}
          >
            Attendance
          </Button>
        </HStack>
        <Center minH="200px">
          {isLoading && <Spinner />}
          {!isLoading && attendances?.data && (
            <TableAttendance
              data={attendances.data}
              revalidateAttendances={revalidateAttendances}
              currentUser={user?.data}
            />
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
      <ModalAttendance
        isOpen={isOpenModalCreateAttendance}
        onClose={onCloseModalCreateAttendance}
      />
    </Layout>
  );
};

export default Attendance;
