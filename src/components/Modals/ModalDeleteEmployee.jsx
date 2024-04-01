import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const ModalDeleteEmployee = ({
  isOpen,
  cancelRef,
  onClose,
  employeeId,
  revalidateEmployees,
}) => {
  const [isLoading, setIsLoading] = useBoolean();
  const apiUrl = import.meta.env.VITE_API_URL;
  const toast = useToast();

  const handleDeleteEmployee = async () => {
    try {
      setIsLoading.on();
      const response = await axios.delete(
        `${apiUrl}/api/v1/users/delete/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      if (response.data) {
        toast({
          title: response.data.message || "Employee deleted successfully",
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
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Employee
          </AlertDialogHeader>
          <AlertDialogBody>
            {`Are you sure? You can't undo this action afterwards.`}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} isDisabled={isLoading}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDeleteEmployee}
              ml={3}
              isLoading={isLoading}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ModalDeleteEmployee;
