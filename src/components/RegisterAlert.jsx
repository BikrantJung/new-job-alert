import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function RegisterAlert(props) {
  const cancelRef = useRef();

  return (
    <>
      <AlertDialog
        isOpen={props.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={props.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Register as company
            </AlertDialogHeader>

            <AlertDialogBody>
              Please register as company to start posting job
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={props.onClose}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={props.onClose} ml={3}>
                Register
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
