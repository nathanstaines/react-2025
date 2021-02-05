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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { createSite } from '@/lib/db';
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';
import { useForm } from 'react-hook-form';

const AddSiteModal = ({ children }) => {
  const { handleSubmit, register } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const toast = useToast();

  const onCreateSite = ({ name, url }) => {
    const newSite = {
      authorId: user.uid,
      createdAt: new Date().toISOString(),
      name,
      settings: {
        icons: false,
        ratings: false,
        timestamps: true,
      },
      url,
    };

    const { id } = createSite(newSite);

    toast({
      title: 'Success',
      description: 'Site added',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    mutate(
      ['/api/sites', user.token],
      async (data) => ({
        sites: [{ id, ...newSite }, ...data.sites],
      }),
      false
    );

    onClose();
  };

  return (
    <>
      <Button
        bg="gray.900"
        color="white"
        onClick={onOpen}
        _hover={{
          bg: 'gray.700',
        }}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader>Add site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                placeholder="Example"
                ref={register({
                  required: 'Required',
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>URL</FormLabel>
              <Input
                name="url"
                placeholder="https://example.com"
                ref={register({
                  required: 'Required',
                })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              bg="gray.900"
              color="white"
              type="submit"
              _hover={{
                bg: 'gray.700',
              }}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
