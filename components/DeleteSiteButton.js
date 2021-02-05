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
import { deleteSite } from '@/lib/db';
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';

const DeleteSiteButton = ({ siteId }) => {
  const [isOpen, setIsOpen] = useState();
  const { user } = useAuth();
  const cancelRef = useRef();

  const onClose = () => setIsOpen(false);

  const onDelete = () => {
    deleteSite(siteId);

    mutate(
      ['/api/sites', user.token],
      async (data) => {
        return {
          sites: data.sites.filter((site) => site.id !== siteId),
        };
      },
      false
    );

    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Delete site"
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
          <AlertDialogHeader>Delete site</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? This will also delete all feedback left on the site.
            This cannot be undone.
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

export default DeleteSiteButton;
