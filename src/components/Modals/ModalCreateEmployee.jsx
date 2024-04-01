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
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const ModalCreateEmployee = ({ isOpen, onClose, revalidateEmployees }) => {
  const roles = [
    {
      id: "096f8ab2-d904-4b57-8503-15bc40a40d4f",
      name: "Developer",
    },
    {
      id: "32607a46-06ae-4004-9d84-ec2b92a02083",
      name: "Finance",
    },
    {
      id: "4f032dae-88b0-40fc-8d0a-e268b288cb08",
      name: "UI/UX Designer",
    },
    {
      id: "c52eabfe-2a65-4c29-855b-042e8b37462e",
      name: "Human Resources",
    },
  ];
  const [isLoading, setIsLoading] = useBoolean();
  const apiUrl = import.meta.env.VITE_API_URL;
  const toast = useToast();

  const handleCreateEmployee = async (e) => {
    e.preventDefault();

    try {
      setIsLoading.on();
      const formData = new FormData(e.currentTarget);
      const fullName = formData.get("fullName");
      const email = formData.get("email");
      const phone = formData.get("phone");
      const isAdmin = JSON.parse(formData.get("access"));
      const employed = new Date(formData.get("employed")).toISOString();
      const roleId = formData.get("role");

      const employeePayload = {
        fullName,
        email,
        password: "User1234!",
        phone,
        isAdmin,
        isActive: true,
        employed,
        roleId,
      };

      const response = await axios.post(
        `${apiUrl}/api/v1/users/create`,
        employeePayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      if (response.data) {
        toast({
          title: "Success add new employee",
          position: "top",
          status: "success",
          isClosable: true,
        });
        onClose();
        revalidateEmployees();
      }
    } catch (err) {
      console.error(err);
      toast({
        title: err?.response?.data?.message || "Server Error",
        position: "top",
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading.off();
    }
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
              <FormControl id="fullName">
                <FormLabel>Full name</FormLabel>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  required
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="johndoe@mail.com"
                  required
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="text"
                  name="password"
                  defaultValue="User1234!"
                  isDisabled
                />
              </FormControl>
              <FormControl id="phone">
                <FormLabel>Phone</FormLabel>
                <Input
                  type="tel"
                  pattern="^\+?\d*$"
                  name="phone"
                  placeholder="+62123456789"
                  required
                />
              </FormControl>
              <FormControl id="employed">
                <FormLabel>Hired Date</FormLabel>
                <Input type="date" name="employed" />
              </FormControl>
              <FormControl id="role">
                <FormLabel>Role</FormLabel>
                <Select name="role" placeholder="Select role" required>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="access">
                <FormLabel>Access</FormLabel>
                <Select name="access" placeholder="Select access" required>
                  <option value="false">User</option>
                  <option value="true">Admin</option>
                </Select>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              colorScheme="blue"
              mr={3}
              isLoading={isLoading}
            >
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
