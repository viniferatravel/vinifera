'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Plus, SquarePen, Trash2 } from "lucide-react"
import {
  Tooltip, RadioGroup, Radio, Button, Input, Chip, Table, DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem, TableHeader, TableColumn, TableBody, Pagination, getKeyValue, TableRow, TableCell, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Autocomplete, AutocompleteItem
} from "@nextui-org/react"
import { PlusIcon, SearchIcon, ChevronDownIcon, DeleteIcon, EditIcon } from "@/_components/icons";
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import DataTable from "@/_components/Admin/DataTable";
import { useSelector } from "react-redux";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "CATEGORY TYPE", uid: "category_type", sortable: true },
  { name: "CATEGORY NAME", uid: "category_name", sortable: true },
  { name: "DESCRIPTION", uid: "description", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions", sortable: true },
];

const statusColorMap = {
  active: "success",
  inactive: "danger",
};

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Inactive", uid: "inactive" },
];

const floorsdata = [
  {
    id: "FID00001",
    floor: "G0",
    floordescription: "G0",
    status: "active",
  },
  {
    id: "FID00002",
    floor: "101",
    floordescription: "101",
    status: "active",
  },
  {
    id: "FID00003",
    floor: "201",
    floordescription: "201",
    status: "inactive",
  },
];


export default function AddCategory() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [categoryName, setCategoryName] = useState();
  const [categoryDesc, setCategoryDesc] = useState();
  const [status, setStatus] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const [result, setResult] = useState([]);
  const [currRowId, setCurrRowId] = useState('');
  const [actionType, setActionType] = useState(null);
  const [lastID, setLastID] = useState(0);

  const checksRef = useRef();
  checksRef.current = useSelector((state) => state.checks.selectedChecks);


  useEffect(() => {
    initialFxn()
  }, [])

  const initialFxn = async () => {
    try {
      const response = await fetch("/api/categoryApi", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      const updatedData = result.data.map((item) => ({
        ...item,
        category_type: item.category_type.toUpperCase(),
      }));
      // console.log("Data:", updatedData);
      setResult(updatedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function getCurrentDateTime() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }





  const generateUniqueID = () => {
    // console.log("Last IF:", lastID)
    const newID = `CTY${String(lastID + 1).padStart(5, '0')}`;
    setLastID(lastID + 1);
    return newID;
  };

  const handleSubmit = useCallback(async () => {

    if (actionType === "add") {
      // console.log("Add")

      const data = {
        id: generateUniqueID(),
        category_type: categoryType,
        category_name: categoryName,
        description: categoryDesc,
        status: status,
        creation_date: getCurrentDateTime(),
        last_update_on: getCurrentDateTime(),
      };

      try {
        const response = await fetch("/api/categoryApi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        // console.log("Data:", result.res);
        const updatedData = result.res.map((item) => ({
          ...item,
          category_type: item.category_type.toUpperCase(),
        }));
        setResult(updatedData);
        onClose()

        if (result.data.result === "Data already existed") {
          toast("Data already existed!")
        } else {
          toast.success("Data inserted!")
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else if (actionType === "edit") {
      // console.log("EDit")
      try {
        const response = await fetch("/api/categoryApi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: currRowId,
            category_type: categoryType,
            category_name: categoryName,
            description: categoryDesc,
            status: status,
            action: "edit"
          }),
        });
        const result = await response.json();
        // console.log("Data:", result);
        const updatedData = result.res.map((item) => ({
          ...item,
          category_type: item.category_type.toUpperCase(),
        }));
        setResult(updatedData);
        onClose()
        toast.success("Data edited!")
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else if (actionType === "editmany") {
      // console.log("Edit Many: ", checksRef.current);

      try {
        const response = await fetch("/api/categoryApi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: checksRef.current, action: actionType,
            status: status
          }),
        });
        const result = await response.json();
        // console.log("Data:", result);
        const updatedData = result.res.map((item) => ({
          ...item,
          category_type: item.category_type.toUpperCase(),
        }));
        setResult(updatedData);
        onClose()
        // toast.success("Data edited!")
        toast.success("Row updated!")
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  });

  useEffect(() => {
    if (result && result.length > 0) {
      const lastElement = result[result.length - 1]; // Get the last element
      const lastElementId = lastElement.id; // Extract the id property from the last element
      const numericPart = lastElementId.match(/(?<=CTY)0*(\d+)/); // Extract numeric part using regular expression
      const lastNumericId = numericPart ? parseInt(numericPart[1]) : null;
      // console.log("Numeric ID of the last element:", lastNumericId);
      setLastID(lastNumericId);
    } else {
      // console.log("No elements in the array.");
      setLastID(0);
    }
  }, [result, handleSubmit])

  useEffect(() => {
    // console.log("REs::::::>", result);
  }, [result])

  useEffect(() => {
    // console.log("Status::::::>", status);
    setStatus(status)
  }, [status])

  const rowEdit = async (key, type, desc, statuses) => {
    // console.log("Statusuasdfasf: ", statuses);
    setCurrRowId(key)
    setCategoryName(type)
    setCategoryDesc(desc)
  }

  useEffect(() => {
    // console.log("Current Row ID::::::>", currRowId);
  }, [currRowId])

  const handleOpen = (type) => {
    // console.log("Inside Hanlde Open", checksRef.current, type, result.length)
    setActionType(type);
    if (result && result.length === 0) {
      checksRef.current = [];
      if (type === "editmany" && (checksRef.current).length === 0) {
        toast.error("No rows selected!")
      } else {
        onOpen();
      }

    } else {
      if (type === "editmany" && (checksRef.current).length === 0) {
        toast.error("No rows selected!")
      } else {
        onOpen();
      }
    }
  };

  const handleDelete = async (id, deleteAction, checks) => {
    // console.log("Delete Opearion: ", id, deleteAction)

    if (deleteAction === "deleteSelected") {

      // console.log("Delete Console", checks, checks.length)

      if (checks.length === 0 || result && result.length === 0) {
        toast.error("No rows selected!")
      } else {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
          if (result.isConfirmed) {

            const response = await fetch("/api/categoryApi", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: id, action: "deleteSelectedChecks", selectedChecks: checks }),
            });
            const result = await response.json();
            // console.log("Data:", result);
            const updatedData = result.res.map((item) => ({
              ...item,
              category_type: item.category_type.toUpperCase(),
            }));
            setResult(updatedData);

            Swal.fire({
              title: "Deleted!",
              text: "Selected rows has been deleted!",
              icon: "success"
            });
          }
        });
      }



    } else {
      try {

        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
          if (result.isConfirmed) {

            const response = await fetch("/api/property/property_floor", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: id, action: "delete" }),
            });
            const result = await response.json();
            // console.log("Data:", result);
            const updatedData = result.res.map((item) => ({
              ...item,
              category_type: item.category_type.toUpperCase(),
            }));
            setResult(updatedData);


            Swal.fire({
              title: "Deleted!",
              text: "Selected row has been deleted.",
              icon: "success"
            });
          }
        });

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }



  };


  useEffect(() => {
    // console.log("Action Type::::::>", actionType);
  }, [actionType])

  let actionsContent = (item, onEditClick, onDeleteClick) => (
    <>
      <Tooltip color="default" content="Edit Bed Type">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <Button
            isIconOnly
            onPress={() => {
              onEditClick(item); // Pass item data to the callback function
              setStatus(item.status);
              setActionType("edit")
              handleOpen("edit");
            }}
            color="default"
            variant="light"
            size="sm"
            onClick={(e) => {
              rowEdit(item.id, item.category_name, item.description, item.status);
            }}
          >
            <EditIcon className="size-4" />
          </Button>
        </span>
      </Tooltip>
      <Tooltip color="danger" content="Delete Bed Type">
        <span className="text-lg text-danger cursor-pointer active:opacity-50">
          <Button
            isIconOnly
            color="danger"
            variant="light"
            size="sm"
            onClick={(e) => {
              onDeleteClick(item)
              handleDelete(item.id);
            }}
          >
            <DeleteIcon className="size-4" />
          </Button>
        </span>
      </Tooltip>
    </>
  );

  const handleClick = () => {
    setCurrRowId('')
    setCategoryName('')
    setCategoryDesc('')
    setStatus('')
  };

  return (
    <><Toaster
      position="top-right"
      reverseOrder={false} /><div className="w-full">
        <h1 className="flex text-3xl ml-6 mt-6"><PlusIcon className="size-8 mt-1" />Add Category</h1>
        <div className="mr-6 text-end">
          {/* <Button onPress={() => handleOpen("add")} color="primary" variant="shadow" onClick={(e) => {
        setCurrRowId('')
        setCategoryName('')
        setCategoryDesc('')
        setStatus('')
    }}><PlusIcon className="size-6" />Add Floor</Button> */}
          <Modal isOpen={isOpen} size="4xl" onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="gap-1">Add Category</ModalHeader>
                  <ModalBody>
                    <div className="p-4 grid grid-cols-2 gap-2">
                      {actionType === "editmany" ? '' :
                        <>
                        
                        <Autocomplete
                        isRequired
                        labelPlacement="outside"
                        placeholder="Select...."
                        label="Category Type"
                        variant="bordered"
                        size="md"
                        className="max-w-xs"
                        defaultSelectedKey={actionType === "edit" ? categoryType : ''}
                        value={categoryType}
                        allowsCustomValue={true}
                        onInputChange={(value) => setCategoryType(value.toLowerCase())}
                      >
                        <AutocompleteItem value="main" key="main">Main</AutocompleteItem>
                        <AutocompleteItem value="sub" key="sub">Sub</AutocompleteItem>
                      </Autocomplete>
                        <Input
                          isRequired
                          type="text"
                          label="Category Name"
                          labelPlacement="outside"
                          placeholder="Category Name"
                          variant="bordered"
                          size="md"
                          className="max-w-xs"
                          value={actionType === "edit" ? categoryName : categoryName}
                          onChange={(e) => setCategoryName((e.target.value).toUpperCase())} />

                          <Textarea
                            isRequired
                            type="text"
                            label="Category Description"
                            labelPlacement="outside"
                            variant="bordered"
                            placeholder="Category description"
                            disableAnimation
                            disableAutosize
                            classNames={{
                              base: "max-w-xs",
                              input: "resize-y min-h-[40px]",
                            }}
                            value={actionType === "edit" ? categoryDesc : categoryDesc}
                            onChange={(e) => setCategoryDesc(e.target.value)} /></>}
                      <Autocomplete
                        isRequired
                        labelPlacement="outside"
                        placeholder="Select...."
                        label="Category Status"
                        variant="bordered"
                        size="md"
                        className="max-w-xs"
                        defaultSelectedKey={actionType === "edit" ? status : ''}
                        value={status}
                        allowsCustomValue={true}
                        onInputChange={(value) => setStatus(value.toLowerCase())}
                      >
                        <AutocompleteItem value="active" key="active">Active</AutocompleteItem>
                        <AutocompleteItem value="inactive" key="inactive">Inactive</AutocompleteItem>
                      </Autocomplete>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onPress={handleSubmit}>
                      Submit
                    </Button>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <div className="mt-10 ml-2 mr-2">
          <DataTable data={result} columns={columns}
            statusOptions={statusOptions} statusColorMap={statusColorMap} columnSort="id" columnName={"category_name"} actionsContent={actionsContent} operation="propType" handleOpen={handleOpen} handleClick={handleClick} handleDelete={handleDelete} handleSubmit={handleSubmit} />
        </div>
      </div></>
  );
};