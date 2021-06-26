import React from 'react';
import { Avatar, Box, Flex, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';

const Profile = () => (
  <Flex
    flexDirection="column"
    paddingLeft={20}
    paddingRight={20}
    h="100%"
    w="100%"
    bgGradient={[
      'linear(to-tr, teal.300,yellow.400)',
      'linear(to-t, blue.200, teal.500)',
      'linear(to-b, orange.100, purple.300)',
    ]}
  >
    <Flex marginTop={10}>
      <Avatar src="https://bit.ly/sage-adebayo" />
      <Box ml="3">
        <Text fontWeight="bold">Segun Adebayo</Text>
        <Text fontSize="sm">UI Engineer</Text>
      </Box>
    </Flex>
    <Flex flexDirection="column" marginTop={10}>
      <Text fontSize="lg" marginBottom={5}>
        Favorite Songs
      </Text>
      <List spacing={3}>
        <ListItem>
          <ListIcon as={PhoneIcon} color="green.500" />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </ListItem>
        <ListItem>
          <ListIcon as={PhoneIcon} color="green.500" />
          Assumenda, quia temporibus eveniet a libero incidunt suscipit
        </ListItem>
        <ListItem>
          <ListIcon as={PhoneIcon} color="green.500" />
          Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
        </ListItem>
        {/* You can also use custom icons from react-icons */}
        <ListItem>
          <ListIcon as={PhoneIcon} color="green.500" />
          Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
        </ListItem>
      </List>
    </Flex>
  </Flex>
);

export default Profile;
