'use client';
import { useState, useEffect } from 'react';
import {
    Modal, Button, Input, ModalHeader,
    ModalBody,
    ModalFooter, ModalContent, useDisclosure
} from '@nextui-org/react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from "@/app/config";

const EmailModal = ({ modalOpen, onCloseModal, selectedPackage }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [email, setEmail] = useState('');

    useEffect(() => {
        if (modalOpen === true) {
            handleOpen();
        }
    }, [modalOpen])

    const handleSendEmail = async () => {
        try {
            const pdfRef = ref(storage, `pdfs/${selectedPackage?.package_id + "-" + selectedPackage?.package_name}`);

            const pdfUrl = await getDownloadURL(pdfRef);

            const response = await fetch('/api/send-email', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    operation: "sendpdfmail",
                    email, pdfUrl, _id: selectedPackage._id
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Email sent successfully!');
            } else {
                // alert(`Error: ${data.message}`);
            }
        } catch (error) {
            // console.log("ERror:::::::>", error)
            // alert('Failed to send email. Please try again later.');
        }
    };

    const handleOpen = () => {
        onOpen();
    }

    const handleClose = () => {
        onClose();
        onCloseModal(false)
    }
    return (
        <Modal isOpen={isOpen}
            onClose={handleClose} width="400px">
            <ModalContent>
                <ModalHeader>
                    <h2>Enter Your Email</h2>
                </ModalHeader>
                <ModalBody>
                    <Input
                        fullWidth
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        aria-label="Email"
                    />
                </ModalBody>

                <ModalFooter>
                    <Button color="danger" variant="light" onPress={handleClose}>
                        Close
                    </Button>
                    <Button color="primary" onPress={handleClose} onClick={handleSendEmail}>
                        Send
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EmailModal;
