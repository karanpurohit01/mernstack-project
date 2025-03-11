import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { FaDeleteLeft } from "react-icons/fa6";

import React from "react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useProductStore } from "../store/product";
import { Toaster, toaster } from "../components/ui/toaster";
import { useState } from "react"
// 
import { Button, Input, Stack ,useDisclosure} from "@chakra-ui/react"
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger
} from "../components/ui/dialog"
import { Field } from "../components/ui/field"
import { useRef } from "react"
// 
const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const {deleteProduct, updateProduct} = useProductStore()
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const handleDeleteProduct = async (pid) => {
    const {success,message} = await deleteProduct(pid)
    if(!success){
      toaster.create({
        title: "Error",
        description: message,
        status:"error",
        isClosable: true
      })
    }else{
      toaster.create({
        title: "Success",
        description: message,
        status:"success",
        isClosable: true
      })
    }
  }
  const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		if (!success) {
			toaster.create({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toaster.create({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
    onClose();
	};
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
         
        <DialogRoot isOpen={isOpen} onClose={onClose}>
            <DialogTrigger asChild>
              <IconButton colorPalette="blue" onClick={() => handleUpdateProduct(product._id,updatedProduct)}>
              <CiEdit />
              </IconButton>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Product</DialogTitle>
              </DialogHeader>
              <DialogBody pb="4">
                <Stack gap="4">
                  <Field label="Product Name">
                    {/* <Input placeholder="name" defaultValue={product.name} /> */}
                    <Input placeholder="name" name='name' value={updatedProduct.name} onChange={(e)=> setUpdatedProduct({...updatedProduct, name: e.target.value})}/>
                  </Field>
                  <Field label="Price">
                    {/* <Input placeholder="price" type="number" defaultValue={product.price} /> */}
                    <Input placeholder="price" name='price' type="number" value={updatedProduct.price} onChange={(e)=> setUpdatedProduct({...updatedProduct, price: e.target.value})}/>
                  </Field>
                  <Field label="Image URL">
                    {/* <Input placeholder="image" defaultValue={product.image} /> */}
                    <Input placeholder="image" name='image' value={updatedProduct.image} onChange={(e)=> setUpdatedProduct({...updatedProduct, image: e.target.value})}/>
                  </Field>
                </Stack>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline" onClick={onClose}>Cancel</Button>
                </DialogActionTrigger>
                <Button onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
              </DialogFooter>
            </DialogContent>
          </DialogRoot>
          
          <IconButton colorPalette="red" onClick={()=> handleDeleteProduct(product._id)}>
            <FaDeleteLeft />
          </IconButton>
        </HStack>
      </Box>
      
      {/* <DialogRoot >
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>
        <DialogBody pb="4">
          <Stack gap="4">
            <Field label="Product Name">
              <Input placeholder="name" />
            </Field>
            <Field label="Price">
              <Input placeholder="price" type="number" />
            </Field>
            <Field label="Image Url">
              <Input placeholder="image" />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot> */}
      
    </Box>
  );
};

export default ProductCard;
