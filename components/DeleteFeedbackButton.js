import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import { deleteFeedback } from '@/lib/db';
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';

const DeleteFeedbackButton = ({ feedbackId }) => {
  const [isOpen, setIsOpen] = useState();
  const { user } = useAuth();
  const cancelRef = useRef();

  const onClose = () => setIsOpen(false);

  const onDelete = () => {
    deleteFeedback(feedbackId);

    mutate(
      ['/api/feedback', user.token],
      async (data) => {
        return {
          feedback: data.feedback.filter(
            (feedback) => feedback.id !== feedbackId
          ),
        };
      },
      false
    );

    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Delete feedback"
        icon={<DeleteIcon />}
        onClick={() => setIsOpen(true)}
        variant="ghost"
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete feedback</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? This cannot be undone.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button mr={3} onClick={onClose} ref={cancelRef}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onDelete}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteFeedbackButton;
