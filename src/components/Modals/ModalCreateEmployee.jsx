import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
} from "@chakra-ui/react";

const ModalCreateEmployee = ({ isOpen, onClose }) => {
  const handleCreateEmployee = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("fullName");
    const role = formData.get("role");
    const employed = new Date(formData.get("employed")).toISOString();
    const email = formData.get("email");
    const phone = formData.get("phone");
    const isAdmin = formData.get("access");

    const employeePayload = {
      name,
      role,
      employed,
      email,
      phone,
      isAdmin,
      isActive: true,
    };

    console.log(employeePayload, "payload");
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new employee</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleCreateEmployee}>
          <ModalBody pb={6}>
            <Stack spacing={4}>
              <FormControl id='fullName'>
                <FormLabel>Full name</FormLabel>
                <Input
                  type='text'
                  name='fullName'
                  placeholder='John Doe'
                  required
                />
              </FormControl>
              <FormControl id='email'>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  name='email'
                  placeholder='johndoe@mail.com'
                  required
                />
              </FormControl>
              <FormControl id='phone'>
                <FormLabel>Phone</FormLabel>
                <Input
                  type='tel'
                  pattern='^\+?\d*$'
                  name='phone'
                  placeholder='+62123456789'
                  required
                />
              </FormControl>
              <FormControl id='employed'>
                <FormLabel>Hired Date</FormLabel>
                <Input type='date' name='employed' />
              </FormControl>
              <FormControl id='role'>
                <FormLabel>Role</FormLabel>
                <Select name='role' placeholder='Select role' required>
                  <option value='programmer'>Programmer</option>
                  <option value='hr'>HR</option>
                  <option value='finance'>Finance</option>
                </Select>
              </FormControl>
              <FormControl id='access'>
                <FormLabel>Access</FormLabel>
                <Select name='access' placeholder='Select access' required>
                  <option value='false'>User</option>
                  <option value='true'>Admin</option>
                </Select>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button type='submit' colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalCreateEmployee;
