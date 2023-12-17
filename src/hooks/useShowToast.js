import { useToast } from "@chakra-ui/react";

const UseShowToast = () => {
  const toast = useToast();

  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  return showToast;
};

export default UseShowToast;
