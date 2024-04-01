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

const ModalEditEmployee = ({ data, isOpen, onClose, revalidateEmployees }) => {
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

  const apiUrl = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useBoolean();
  const toast = useToast();

  const handleEditEmployee = async (e) => {
    e.preventDefault();

    try {
      setIsLoading.on();
      const formData = new FormData(e.currentTarget);
      const fullName = formData.get("fullName");
      const role = formData.get("role");
      const employed = new Date(formData.get("employed")).toISOString();
      const email = formData.get("email");
      const phone = formData.get("phone");
      const isAdmin = JSON.parse(formData.get("access"));

      const employeePayload = {
        fullName,
        role,
        employed,
        email,
        phone,
        isAdmin,
        isActive: true,
      };

      const response = await axios.put(
        `${apiUrl}/api/v1/users/edit/${data.id}`,
        employeePayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      if (response.data) {
        console.log(response.data, "rd");
        toast({
          title: response.data.message || "Employee updated successfully",
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
        <ModalHeader>Edit employee</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleEditEmployee}>
          <ModalBody pb={6}>
            <Stack spacing={4}>
              <FormControl id="fullName">
                <FormLabel>Full name</FormLabel>
                <Input
                  type="text"
                  name="fullName"
                  defaultValue={data?.fullName}
                  placeholder="John Doe"
                  required
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  defaultValue={data?.email}
                  placeholder="johndoe@mail.com"
                  required
                  isReadOnly={true}
                />
              </FormControl>
              <FormControl id="phone">
                <FormLabel>Phone</FormLabel>
                <Input
                  type="tel"
                  pattern="^\+?\d*$"
                  name="phone"
                  defaultValue={data?.phone}
                  placeholder="+62123456789"
                  required
                />
              </FormControl>
              <FormControl id="employed">
                <FormLabel>Hired Date</FormLabel>
                <Input
                  type="date"
                  name="employed"
                  defaultValue={data?.employed?.substring(0, 10)}
                />
              </FormControl>
              <FormControl id="role">
                <FormLabel>Role</FormLabel>
                <Select
                  name="role"
                  defaultValue={data?.role?.id}
                  placeholder="Select role"
                  required
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="access">
                <FormLabel>Access</FormLabel>
                <Select
                  name="access"
                  defaultValue={data?.isAdmin}
                  placeholder="Select access"
                  required
                >
                  <option value="false">User</option>
                  <option value="true">Admin</option>
                </Select>
              </FormControl>
              <FormControl id="status">
                <FormLabel>Access</FormLabel>
                <Select
                  name="status"
                  defaultValue={data?.isActive}
                  placeholder="Select user status"
                  required
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
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
            <Button onClick={onClose} isDisabled={isLoading}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditEmployee;
