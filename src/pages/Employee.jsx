import {
  TableContainer,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Flex,
  Box,
  Text,
  Avatar,
  Tag,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Layout from "../components/Layout";

const Employee = () => {
  return (
    <Layout>
      <Box padding='22px' backgroundColor='white' borderRadius='15px'>
        <Flex width='100%' padding='6px 0 22px'>
          <Text as='h2' fontWeight='bold' fontSize='large'>
            Employee Table
          </Text>
        </Flex>
        <TableContainer>
          <Table variant='simple' colorScheme='blackAlpha'>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Role</Th>
                <Th>Status</Th>
                <Th>Employed</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Flex gap={3} alignItems='center'>
                    <Avatar name='John Doe' src='https://bit.ly/broken-link' />
                    <Text>John Doe</Text>
                  </Flex>
                </Td>
                <Td>Programmer</Td>
                <Td>
                  <Tag colorScheme='green'>Active</Tag>
                </Td>
                <Td>14/06/21</Td>
                <Td>johndoe@mail.com</Td>
                <Td>+62857865221234</Td>
                <Td>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label='options'
                      icon={<BsThreeDotsVertical />}
                      variant='outline'
                    />
                    <MenuList>
                      <MenuItem>Edit</MenuItem>
                      <MenuItem>Delete</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Flex gap={3} alignItems='center'>
                    <Avatar
                      name='Jessica Jane'
                      src='https://bit.ly/broken-link'
                    />
                    <Text>Jessica Jane</Text>
                  </Flex>
                </Td>
                <Td>Programmer</Td>
                <Td>
                  <Tag colorScheme='green'>Active</Tag>
                </Td>
                <Td>14/06/21</Td>
                <Td>johndoe@mail.com</Td>
                <Td>+62857865221234</Td>
                <Td>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label='options'
                      icon={<BsThreeDotsVertical />}
                      variant='outline'
                    />
                    <MenuList>
                      <MenuItem>Edit</MenuItem>
                      <MenuItem>Delete</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Flex gap={3} alignItems='center'>
                    <Avatar
                      name='Budi Gunawan'
                      src='https://bit.ly/broken-link'
                    />
                    <Text>Budi Gunawan</Text>
                  </Flex>
                </Td>
                <Td>Programmer</Td>
                <Td>
                  <Tag colorScheme='green'>Active</Tag>
                </Td>
                <Td>14/06/21</Td>
                <Td>johndoe@mail.com</Td>
                <Td>+62857865221234</Td>
                <Td>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label='options'
                      icon={<BsThreeDotsVertical />}
                      variant='outline'
                    />
                    <MenuList>
                      <MenuItem>Edit</MenuItem>
                      <MenuItem>Delete</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
};

export default Employee;
