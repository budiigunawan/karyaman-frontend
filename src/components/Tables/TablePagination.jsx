import { HStack, Select, Text } from "@chakra-ui/react";
import {
  Pagination,
  PaginationContainer,
  PaginationNext,
  PaginationPage,
  PaginationPageGroup,
  PaginationPrevious,
  PaginationSeparator,
} from "@ajna/pagination";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const TablePagination = ({
  pagesCount,
  currentPage,
  isDisabled,
  onPageChange,
  onPageSizeChange,
  pages,
  pageSize,
}) => {
  return (
    <HStack
      id='tablePagination'
      w={"full"}
      justify='space-between'
      bg='#FFF'
      p='24px'
    >
      <Select
        id='slctPageSize'
        onChange={(event) => onPageSizeChange(Number(event.target.value))}
        w='70px'
        size='sm'
        borderRadius='4px'
        value={pageSize}
      >
        {[10, 25, 50].map((val) => (
          <Text
            as='option'
            key={val}
            value={val}
            fontSize='12px'
            fontWeight={500}
            lineHeight='16px'
          >
            {val}
          </Text>
        ))}
      </Select>
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        isDisabled={isDisabled}
        onPageChange={onPageChange}
      >
        <PaginationContainer
          id='paginationContainer'
          w={"max-content"}
          gap='12px'
          align='center'
        >
          <PaginationPrevious size='sm' variant='ghost' border='1px solid #CCC'>
            <FaChevronLeft stroke='#CCC' />
          </PaginationPrevious>
          <PaginationPageGroup
            isInline
            align='center'
            gap='12px'
            separator={<PaginationSeparator jumpSize={10} size='sm' />}
          >
            {pages.map((page) => (
              <PaginationPage
                id='btnNextPage'
                key={`btnPage${page}`}
                size='sm'
                page={page}
                p='4px 8px'
                variant='ghost'
                fontSize='12px'
                lineHeight='16px'
                color='#0056CC'
                border='1px solid #CCC'
                _current={{
                  bg: "#0056CC",
                  border: "1px solid #0C4AC0",
                  color: "#FFF",
                }}
                _hover={{
                  bg: "#0056CC",
                  border: "1px solid #0C4AC0",
                  color: "#FFF",
                }}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext size='sm' variant='ghost' border='1px solid #CCC'>
            <FaChevronRight stroke='#CCC' />
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
    </HStack>
  );
};

export default TablePagination;
