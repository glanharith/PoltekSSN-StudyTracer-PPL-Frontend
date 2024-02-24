import { ReactNode, useState, useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import navStyles from "./navbar.module.css";
import { parseUser } from "@/utils";
import { ParsedUser } from "@/utils/parseUser/interface";
import { useRouter } from "next/navigation";

const defaultUserMenu = [
  {
    name: "Home",
    path: "/",
    role: "ALUMNI",
  },
  {
    name: "My Todos",
    path: "/todos",
    role: "ALUMNI",
  },
  {
    name: "My Admin",
    path: "/admin",
    role: "ADMIN",
  },
];

const NavLink = ({ children, path }: { children: ReactNode; path: string }) => (
  <Box
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
  >
    <Link href={path}>{children}</Link>
  </Box>
);

export const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [userRole, setUserRole] = useState("guest");
  const [userMenu, setUserMenu] = useState(defaultUserMenu); // State to store user menu
  useEffect(() => {
    const fetchUser = async () => {
      const user = await parseUser();
      if (!user) {
        setUserRole("guest");
        setUserMenu([]);
      } else {
        setUserRole(user.role);
        // Filter user menu based on user role
        setUserMenu(defaultUserMenu.filter((item) => item.role === user.role));
      }
    };

    fetchUser();
  }, []);

  return (
    <div className={navStyles.mobileNav}>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} rounded={40}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Image src="assets/images/poltek-ssn-logo.png" boxSize="40px" alt="logo" />
            </Box>
            <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
              {userMenu.map(({ name, path }) => (
                // Use filtered user menu
                <NavLink key={path} path={path}>
                  {name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button
              variant={"solid"}
              colorScheme={""}
              border="2px"
              borderColor={"blue.900"}
              size={"sm"}
              mr={4}
              textColor={"blue.900"}
              onClick={() => {
                router.replace("/register");
              }}
            >
              Register
            </Button>
            <Button
              variant={"solid"}
              bg="#1A365D"
              textColor={"white"}
              size={"sm"}
              mr={4}
              onClick={() => {
                router.replace("/login");
              }}
            >
              Login
            </Button>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>123
              {userMenu.map(({ name, path }) => (
                // Use filtered user menu
                <NavLink key={path} path={path}>
                  {name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </div>
  );
};
