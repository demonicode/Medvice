'use client'
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import ChatbotTab from '../components/ChatbotTab';
import Specialities from '../components/Specialities';
import PatientInfoTab from '../components/PatientInfoTab';
import 'react-tabs/style/react-tabs.css';
import {SetStateAction, useEffect, useState} from 'react';
// import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";

import {Button, ButtonGroup} from "@nextui-org/react";


export default function HomePage() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    // This code runs whenever `isLoggedIn` changes
    if (isLoggedIn) {
      // Actions to perform when the user is logged in
      console.log('User is logged in');
      // For example, you could navigate to a different page or change the UI in some way
    } else {
      // Actions to perform when the user is not logged in
      console.log('User is logged out');
      // For example, you might want to show a login prompt or redirect to a public page
    }
  }, [isLoggedIn]);
  
    // Handler for changes in the email input
    const handleEmailChange = (event:any) => {
      setEmail(event.target.value);
    };
  
    // Handler for changes in the password input
    const handlePasswordChange = (event:any) => {
      setPassword(event.target.value);
    };

    const handleAvatarClick = () => {
      if (isLoggedIn) {
        // Show dropdown menu
        console.log('Showing dropdown menu...');
      } else {
        // Show login dialog
        console.log('Showing login dialog...');
      }
    };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: 'POST',
      headers: {  
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
    if (response.ok) {
      console.log('Login successful:', data);
      localStorage.setItem('token', data.token); // Store the JWT token
      setLoginOpen(false);
      setIsLoggedIn(true);
    } else {
      console.error('Login failed:', data.message);
      setLoginErrorMessage(data.message);
      // Handle login error (show error message, etc.)
    }
  };

  return (
    <div>
      <header>
      </header>
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Medvice</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={tabIndex==0 ? true : false}>
          <Link onClick={() => setTabIndex(0)} style={{ color: tabIndex === 0 ? 'white' : 'grey' }} href="#">
            Medvicer
          </Link>
        </NavbarItem>
        <NavbarItem isActive={tabIndex==1 ? true : false}>
          <Link  onClick={() => setTabIndex(1)} href="#" aria-current="page" style={{ color: tabIndex === 1 ? 'white' : 'grey' }}>
            Specialities
          </Link>
        </NavbarItem>
        <NavbarItem isActive={tabIndex==2 ? true : false}>
          <Link onClick={() => setTabIndex(2)} style={{ color: tabIndex === 2 ? 'white' : 'grey' }} href="#">
            Patient Information
          </Link>
        </NavbarItem>
        <NavbarItem isActive={tabIndex==3 ? true : false}>
          <Link onClick={() => setTabIndex(3)} style={{ color: tabIndex === 3 ? 'white' : 'grey' }} href="#">
            Find Doctors
          </Link>
        </NavbarItem>
        <NavbarItem isActive={tabIndex==4 ? true : false}>
          <Link onClick={() => setTabIndex(4)} style={{ color: tabIndex === 4 ? 'white' : 'grey' }} href="#">
            Prescriptions
          </Link>
        </NavbarItem>
        <NavbarItem isActive={tabIndex==4 ? true : false}>
          <Link onClick={() => setTabIndex(5)} style={{ color: tabIndex === 5 ? 'white' : 'grey' }} href="#">
            News Feed
          </Link>
        </NavbarItem>
        <NavbarItem isActive={tabIndex==4 ? true : false}>
          <Link onClick={() => setTabIndex(6)} style={{ color: tabIndex === 6 ? 'white' : 'grey' }} href="#">
            Insurance
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        
          {(isLoggedIn) ? (
            <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">zoey@gmail.com</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
        </Dropdown>

          ) : 
          (
            <Dialog open={isLoginOpen} onOpenChange={setLoginOpen}>
            <DialogTrigger asChild>
            <Button color="primary" variant="ghost">
              Login
            </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>
                  Fill details to login
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" value={email} onChange={handleEmailChange} className="col-span-3" />
                </div>
                <div style={{width:'100%'}} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                  password
                  </Label>
                  <Input id="password" value={password} onChange={handlePasswordChange} className="col-span-3" />
                  {loginErrorMessage && <div style={{ 
                    color: 'red', 
                    textAlign: 'center', 
                    width: '100%', 
                    padding: '10px'}}>{loginErrorMessage}</div>}
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" onClick={handleSubmit}>Submit</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          )}
          
            
      </NavbarContent>
    </Navbar>


      <Tabs selectedIndex={tabIndex} onSelect={(index: SetStateAction<number>) => setTabIndex(index)}>
        <TabPanel>
            <ChatbotTab />
        </TabPanel>
        <TabPanel>
          <Specialities />
        </TabPanel>
        <TabPanel>
          <PatientInfoTab loggedin={isLoggedIn}/>
        </TabPanel>
      </Tabs>


    </div>
  );
}
