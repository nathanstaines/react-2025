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
  Switch,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { mutate } from 'swr';
import { updateSite } from '@/lib/db';
import { useForm } from 'react-hook-form';

const UpdateSiteModal = ({ settings, siteId, children }) => {
  const { handleSubmit, register } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onUpdateSite = async (newSettings) => {
    await updateSite(siteId, {
      settings: newSettings,
    });

    toast({
      title: 'Success',
      description: 'Site updated',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    mutate(`/api/sites/${siteId}`);

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
        <ModalContent as="form" onSubmit={handleSubmit(onUpdateSite)}>
          <ModalHeader>Update site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl alignItems="center" display="flex" mb={4}>
              <Switch
                colorScheme="cyan"
                defaultChecked={settings?.icons}
                id="icons"
                key={settings?.icons}
                mr={2}
                name="icons"
                ref={register()}
              />
              <FormLabel htmlFor="icons" mb={0}>
                Show icons
              </FormLabel>
            </FormControl>
            <FormControl alignItems="center" display="flex" mb={4}>
              <Switch
                colorScheme="cyan"
                defaultChecked={settings?.ratings}
                id="ratings"
                key={settings?.ratings}
                mr={2}
                name="ratings"
                ref={register()}
              />
              <FormLabel htmlFor="ratings" mb={0}>
                Show ratings
              </FormLabel>
            </FormControl>
            <FormControl alignItems="center" display="flex" mb={4}>
              <Switch
                colorScheme="cyan"
                defaultChecked={settings?.timestamps}
                id="timestamps"
                key={settings?.timestamps}
                mr={2}
                name="timestamps"
                ref={register()}
              />
              <FormLabel htmlFor="timestamps" mb={0}>
                Show timestamps
              </FormLabel>
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
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateSiteModal;
