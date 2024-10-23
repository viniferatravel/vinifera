"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const Editblog = ({ id }) => {

  console.log(id, "edit id");

  const [isOpen, setIsOpen] = React.useState(false);
  const [size, setSize] = React.useState('5xl');

  const [fetchsingleblog, setfetchsingleblog] = useState({ title: "", writer: "", readTime: "", introduction: "" });
  console.log(fetchsingleblog, "fetchsingleblog");

  const [sections, setSections] = useState([
    {
      sectionheading: '',
      sectioncontent: [{ sectioncontentone: '' }],
      quote: '',
      list: [{ listone: '' }],
      tableheader: '',
      tabledescription: '',
      tableheaderone: [{ tableheading: '' }],
      tabledescriptionone: [{ tabledescriptionpara: '' }],
    },
  ]);
  console.log(sections, "sections");

  const [selectdate, setselectdate] = useState(null);
  console.log(selectdate, "selectdate");

  const [selectedFile, setSelectedFile] = useState('');
  console.log(selectedFile, "selectedFile");

  const [imagename, setimagename] = useState('');
  console.log(imagename, "imagename");

  useEffect(() => {
    async function fetchdata() {
      const response = await axios.post("/api/blog/blogfetch", {
        operation: "fetchsinglejob",
        _id: id,
      })
      console.log(response.data.fetchsingleblog, "fetch single blog");
      const blogData = response.data.fetchsingleblog;
      setfetchsingleblog({
        title: blogData.title,
        writer: blogData.writer,
        readTime: blogData.readTime,
        introduction: blogData.introduction
      });
      setSections(blogData.sections);
      setselectdate(new Date(blogData.date))
      setimagename(blogData.image.public_id.split('/').pop());
    }
    fetchdata()

  }, [id]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0] || '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setfetchsingleblog({
      ...fetchsingleblog,
      [name]: value,
    });
  };

  const handleSectionChange = (sectionIndex, field, value) => {
    const updatedSections = sections.map((section, index) =>
      index === sectionIndex ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
  };

  const handleAddResponsibility = (index, field) => {
    const updatedSections = sections.map((section, secIndex) =>
      secIndex === index
        ? { ...section, [field]: [...section[field], { [field]: "" }] }
        : section
    );
    setSections(updatedSections);
  };

  const handleRemoveResponsibility = (secIndex, respIndex, field) => {
    const updatedSections = sections.map((section, index) =>
      index === secIndex
        ? {
          ...section,
          [field]: section[field].filter((_, i) => i !== respIndex),
        }
        : section
    );
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    setSections([...sections, {
      sectionheading: '',
      sectioncontent: [{ sectioncontentone: '' }],
      quote: '',
      list: [{ listone: '' }],
      tableheader: '',
      tabledescription: '',
      tableheaderone: [{ tableheading: '' }],
      tabledescriptionone: [{ tabledescriptionpara: '' }],
    }]);
  };

  const handleRemoveSection = (index) => {
    setSections(sections.filter((_, secIndex) => secIndex !== index));
  };

  if (!fetchsingleblog) {
    return <div>Loading...</div>;
  }

  const handledatechange = (date) => {
    setselectdate(date)
  }

  const handleeditblog = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_id", id);
    formData.append("title", fetchsingleblog.title);
    formData.append("writer", fetchsingleblog.writer);
    formData.append("introduction", fetchsingleblog.introduction);
    formData.append("readTime", fetchsingleblog.readTime);
    formData.append("date", selectdate ? selectdate.toISOString() : "");
    formData.append('sections', JSON.stringify(sections));

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    console.log([...formData]); // Check FormData content

    const response = await axios.post("/api/blog/editblog", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response.data, "check response");
    if (response.data.status === 200) {
      alert(response.data.message);
      window.location.reload();
    }
  };

  const sizes = ["5xl"];

  const handleOpen = (size) => {
    setSize(size);
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const currentDate = new Date();

  return (
    <>
      <div className="mt-[1rem]">
        {sizes.map((size) => (
          <Button color="primary" key={size} onPress={() => handleOpen(size)}><span><Pencil className='w-[15px] h-[15px]' /></span> Edit</Button>
        ))}
      </div>
      <Modal
        size={size}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody className='overflow-y-scroll'>

                <div className='h-[350px] overflow-y-scroll'>
                  <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10'>
                    <div className='flex flex-col'>
                      <label className="text-gray-700">Title:</label>
                      <input
                        type="text"
                        name="title"
                        value={fetchsingleblog.title}
                        onChange={handleChange}
                        className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm"
                      />
                    </div>

                    <div className='flex flex-col'>
                      <label className="text-gray-700">Author:</label>
                      <input
                        type="text"
                        name="writer"
                        value={fetchsingleblog.writer}
                        onChange={handleChange}
                        className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm"
                      />
                    </div>

                    <div className='flex flex-col'>
                      <label className="text-gray-700">Date:</label>
                      <DatePicker
                        selected={selectdate}
                        onChange={handledatechange}
                        minDate={currentDate}
                        className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm"
                      />
                    </div>

                    <div className='flex flex-col'>
                      <label className="text-gray-700">Read Time:</label>
                      <input
                        type="text"
                        name="readTime"
                        value={fetchsingleblog.readTime}
                        onChange={handleChange}
                        className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-gray-700">Upload Image:</label>
                      <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm"
                      />
                      {imagename || 'No file chosen'}
                    </div>

                    <div className='flex flex-col'>
                      <label className="text-gray-700">Introduction:</label>
                      <textarea
                        name="introduction"
                        value={fetchsingleblog.introduction}
                        onChange={handleChange}
                        className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm"
                      />
                    </div>
                  </div>

                  {sections.map((section, index) => (
                    <div key={index} style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }} className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mt-10 bg-gray-100 p-10 rounded-lg'>
                      <div className='flex flex-col'>
                        <label className="text-gray-700">Section Heading:</label>
                        <input
                          type="text"
                          name="sectionheading"
                          value={section.sectionheading}
                          onChange={(e) =>
                            handleSectionChange(index, "sectionheading", e.target.value)
                          }
                          className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm"
                        />
                      </div>

                      <div className='flex flex-col'>
                        <label className="text-gray-700">Section Content:</label>
                        {section.sectioncontent.map((content, contentIndex) => (
                          <li key={contentIndex} className="flex mb-2">
                            <input
                              type="text"
                              value={content.sectioncontentone}
                              onChange={(e) => {
                                const updatedContent = section.sectioncontent.map((c, i) =>
                                  i === contentIndex
                                    ? { sectioncontentone: e.target.value }
                                    : c
                                );
                                handleSectionChange(index, "sectioncontent", updatedContent);
                              }}
                              className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm flex-1"
                            />
                          </li>
                        ))}
                        <div className="grid grid-cols-2 gap-5">
                          <Button
                            color="primary"
                            className="mt-2 rounded-xl"
                            onClick={() => handleAddResponsibility(index, "sectioncontent")}
                          >
                            Add Content
                          </Button>
                          <Button
                            className="mt-2 bg-white border-2 border-primary text-blue-700 font-medium"
                            onClick={() =>
                              handleRemoveResponsibility(
                                index,
                                section.sectioncontent.length - 1,
                                "sectioncontent"
                              )
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      </div>

                      <div className='flex flex-col'>
                        <label className="text-gray-700">Quote:</label>
                        <input
                          type="text"
                          value={section.quote}
                          onChange={(e) => handleSectionChange(index, 'quote', e.target.value)}
                          className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm"
                        />
                      </div>

                      <div className='flex flex-col'>
                        <label className="text-gray-700">List:</label>
                        {section.list.map((listItem, listIndex) => (
                          <div key={listIndex} className="flex mb-2">
                            <input
                              type="text"
                              value={listItem.listone}
                              onChange={(e) => {
                                const updatedList = section.list.map((l, i) => (
                                  i === listIndex ? { listone: e.target.value } : l
                                ));
                                handleSectionChange(index, 'list', updatedList);
                              }}
                              className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm flex-1"
                            />
                          </div>
                        ))}
                        <div className='grid grid-cols-2 gap-5'>
                          <Button color="primary" className="mt-2 rounded-xl" onClick={() => handleAddResponsibility(index, 'list')}>
                            Add List Item
                          </Button>
                          <Button
                            className='mt-2 bg-white border-2 border-primary text-blue-700 font-medium'
                            onClick={() => handleRemoveResponsibility(index, section.list.length - 1, 'list')}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>

                      <div className='flex flex-col'>
                        <label className="text-gray-700">Table Header:</label>
                        <input
                          type="text"
                          value={section.tableheader}
                          onChange={(e) => handleSectionChange(index, 'tableheader', e.target.value)}
                          className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm"
                        />
                      </div>

                      <div className='flex flex-col'>
                        <label className="text-gray-700">Table Description:</label>
                        <input
                          type="text"
                          value={section.tabledescription}
                          onChange={(e) => handleSectionChange(index, 'tabledescription', e.target.value)}
                          className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm"
                        />
                      </div>

                      <div className='flex flex-col'>
                        <label className="text-gray-700">Table Header One:</label>
                        {section.tableheaderone.map((header, headerIndex) => (
                          <li key={headerIndex} className="flex mb-2">
                            <input
                              type="text"
                              value={header.tableheading}
                              onChange={(e) => {
                                const updatedHeaders = section.tableheaderone.map((h, i) => (
                                  i === headerIndex ? { tableheading: e.target.value } : h
                                ));
                                handleSectionChange(index, 'tableheaderone', updatedHeaders);
                              }}
                              className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm flex-1"
                            />
                          </li>
                        ))}
                        <div className='grid grid-cols-2 gap-5'>
                          <Button color="primary" className="mt-2 rounded-xl" onClick={() => handleAddResponsibility(index, 'tableheaderone')}>
                            Add Header
                          </Button>
                          <Button
                            className='mt-2 bg-white border-2 border-primary text-blue-700 font-medium'
                            onClick={() => handleRemoveResponsibility(index, section.tableheaderone.length - 1, 'tableheaderone')}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>

                      <div className='flex flex-col'>
                        <label className="text-gray-700">Table Description One:</label>
                        {section.tabledescriptionone.map((description, descriptionIndex) => (
                          <li key={descriptionIndex} className="flex mb-2">
                            <input
                              type="text"
                              value={description.tabledescriptionpara}
                              onChange={(e) => {
                                const updatedDescriptions = section.tabledescriptionone.map((d, i) => (
                                  i === descriptionIndex ? { tabledescriptionpara: e.target.value } : d
                                ));
                                handleSectionChange(index, 'tabledescriptionone', updatedDescriptions);
                              }}
                              className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm flex-1"
                            />
                          </li>
                        ))}
                        <div className='grid grid-cols-2 gap-5'>
                          <Button color="primary" className="mt-2 rounded-xl" onClick={() => handleAddResponsibility(index, 'tabledescriptionone')}>
                            Add Description
                          </Button>
                          <Button
                            className='mt-2 bg-white border-2 border-primary text-blue-700 font-medium'
                            onClick={() => handleRemoveResponsibility(index, section.tabledescriptionone.length - 1, 'tabledescriptionone')}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className='grid grid-cols-2 gap-5 mt-8'>
                    <Button color="primary" className="mt-2 rounded-xl" onClick={handleAddSection}>
                      Add Section
                    </Button>
                    <Button
                      className='mt-2 bg-white border-2 border-primary text-blue-700 font-medium'
                      onClick={() => handleRemoveSection(sections.length - 1)}
                    >
                      Remove Section
                    </Button>
                  </div>
                </div>

              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleeditblog}>
                  Submit
                </Button>
                <Button className='bg-white border-2 border-primary text-blue-700 font-medium' onPress={handleClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}


const AddBlog = () => {

  const [isOpen, setIsOpen] = React.useState(false);
  const [size, setSize] = React.useState('5xl');

  const sizes = ["5xl"];

  const handleOpen = (size) => {
    setSize(size);
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const [blogdata, setblogdata] = useState({ title: "", writer: "", readTime: "", introduction: "" });
  console.log(blogdata, "blogdata");

  const [fetchallblog, setfetchallleblog] = useState([]);
  console.log(fetchallblog, "fetchallblog");

  const [sections, setSections] = useState([
    {
      sectionheading: '',
      sectioncontent: [{ sectioncontentone: '' }],
      quote: '',
      list: [{ listone: '' }],
      tableheader: '',
      tabledescription: '',
      tableheaderone: [{ tableheading: '' }],
      tabledescriptionone: [{ tabledescriptionpara: '' }],
    },
  ]);
  console.log(sections, "sections");

  const [selectdate, setselectdate] = useState(null);
  console.log(selectdate, "selectdate");

  const [image, setimage] = useState(null);
  console.log(image, "image");

  const currentDate = new Date();

  const handledatechange = (date) => {
    setselectdate(date)
  }

  const handleImage = (e) => {
    if (e.target.files) {
      setimage(e.target.files[0])
    }
  };

  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setblogdata({ ...blogdata, [name]: value })
  }

  const handleSectionChange = (index, field, value) => {
    const updatedSections = sections.map((section, secIndex) => (
      secIndex === index ? { ...section, [field]: value } : section
    ));
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    setSections([...sections, {
      sectionheading: '',
      sectioncontent: [{ sectioncontentone: '' }],
      quote: '',
      list: [{ listone: '' }],
      tableheader: '',
      tabledescription: '',
      tableheaderone: [{ tableheading: '' }],
      tabledescriptionone: [{ tabledescriptionpara: '' }],
    }]);
  };

  const handleRemoveSection = (index) => {
    setSections(sections.filter((_, secIndex) => secIndex !== index));
  };

  const handleAddResponsibility = (index, field) => {
    const updatedSections = sections.map((section, secIndex) => (
      secIndex === index ? { ...section, [field]: [...section[field], { [field]: '' }] } : section
    ));
    setSections(updatedSections);
  };

  const handleRemoveResponsibility = (secIndex, respIndex, field) => {
    const updatedSections = sections.map((section, index) => (
      index === secIndex ? { ...section, [field]: section[field].filter((_, i) => i !== respIndex) } : section
    ));
    setSections(updatedSections);
  };

  useEffect(() => {
    async function getdata() {
      const response = await axios.post("/api/blog/blogfetch", {
        operation: "fetchallblog",
      });
      console.log(response.data.fetchsingleblog, "fetch single blog");
      setfetchallleblog(response.data.fetchsingleblog)
    }
    getdata()
  }, [])

  const handleblogform = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blogdata.title);
    formData.append("writer", blogdata.writer);
    formData.append("readTime", blogdata.readTime);
    formData.append("introduction", blogdata.introduction);
    formData.append('sections', JSON.stringify(sections));
    formData.append("date", selectdate ? selectdate.toISOString() : "");
    if (image) {
      formData.append("file", image); 
    }

    try {
      const response = await axios.post("/api/blog/addblog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.status === 200) {
        alert(response.data.message);
        setblogdata({ title: "", writer: "", readTime: "", introduction: "" });
        setSections([
          {
            sectionheading: '',
            sectioncontent: [{ sectioncontentone: '' }],
            quote: '',
            list: [{ listone: '' }],
            tableheader: '',
            tabledescription: '',
            tableheaderone: [{ tableheading: '' }],
            tabledescriptionone: [{ tabledescriptionpara: '' }],
          },
        ]);
        setselectdate(null);
        setimage(null);
        window.location.reload();
      }
      else if (response.data.status === 401) {
        alert(response.data.message);
        setblogdata({ title: "", writer: "", readTime: "", introduction: "" });
        setSections([
          {
            sectionheading: '',
            sectioncontent: [{ sectioncontentone: '' }],
            quote: '',
            list: [{ listone: '' }],
            tableheader: '',
            tabledescription: '',
            tableheaderone: [{ tableheading: '' }],
            tabledescriptionone: [{ tabledescriptionpara: '' }],
          },
        ]);
        setselectdate(null);
        setimage(null);
      }
      else if (response.data.status === 402) {
        alert(response.data.message);
        setblogdata({ title: "", writer: "", readTime: "", introduction: "" });
        setSections([
          {
            sectionheading: '',
            sectioncontent: [{ sectioncontentone: '' }],
            quote: '',
            list: [{ listone: '' }],
            tableheader: '',
            tabledescription: '',
            tableheaderone: [{ tableheading: '' }],
            tabledescriptionone: [{ tabledescriptionpara: '' }],
          },
        ]);
        setselectdate(null);
        setimage(null);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const deleteblog = async (id) => {

    const userconfirmed = window.confirm("are you sure")

    if (userconfirmed) {
      const response = await axios.post("/api/blog/deleteblog", {
        _id: id,
      })
      console.log(response.data, "check blog");
      if (response.data.status === 200) {
        alert(response.data.message);
        window.location.reload();
      } else if (response.data.status === 401) {
        alert(response.data.message);
      } else {
        alert("error")
      }
    }
  }

  return (
    <>
      <div className='w-[90%] m-auto'>
        <div className="flex justify-end flex-wrap gap-3 mt-[2rem]">
          {sizes.map((size) => (
            <Button className='font-normal' key={size} onPress={() => handleOpen(size)}><span className='text-lg font-normal'>+</span> Add Blog</Button>
          ))}
        </div>
        <Modal
          size={size}
          isOpen={isOpen}
          onClose={handleClose}
        >
          <ModalContent >
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody className='overflow-y-scroll'>
                  <div className='h-[350px] overflow-y-scroll'>
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10'>
                      <div className='flex flex-col'>
                        <label className="text-gray-700">Title:</label>
                        <input
                          type="text"
                          name="title"
                          value={blogdata.title}
                          onChange={handleChange}
                          className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm"
                        />
                      </div>

                      <div className='flex flex-col'>
                        <label className="text-gray-700">Author:</label>
                        <input
                          type="text"
                          name="writer"
                          value={blogdata.writer}
                          onChange={handleChange}
                          className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm"
                        />
                      </div>

                      <div className='flex flex-col'>
                        <label className="text-gray-700">Date:</label>
                        <DatePicker selected={selectdate} onChange={handledatechange} minDate={currentDate} className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm" />
                      </div>

                      <div className='flex flex-col'>
                        <label className="text-gray-700">Read Time:</label>
                        <input
                          type="text"
                          name="readTime"
                          value={blogdata.readTime}
                          onChange={handleChange}
                          className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm"
                        />
                      </div>

                      <div className='flex flex-col'>
                        <label className="text-gray-700">Upload Image:</label>
                        <input
                          type="file"
                          name="image"
                          onChange={handleImage}
                          className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm"
                        />
                      </div>

                      <div className='flex flex-col'>
                        <label className="text-gray-700">Introduction:</label>
                        <textarea
                          name="introduction"
                          value={blogdata.introduction}
                          onChange={handleChange}
                          className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm"
                        />
                      </div>
                    </div>

                    {sections.map((section, index) => (
                      <div key={index} style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }} className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mt-10 bg-gray-100 p-10 rounded-lg'>
                        <div className='flex flex-col'>
                          <label className="text-gray-700">Section Heading:</label>
                          <input
                            type="text"
                            value={section.sectionheading}
                            onChange={(e) => handleSectionChange(index, 'sectionheading', e.target.value)}
                            className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm"
                          />
                        </div>

                        <div className='flex flex-col'>
                          <label className="text-gray-700">Section Content:</label>
                          {section.sectioncontent.map((content, contentIndex) => (
                            <li key={contentIndex} className="flex mb-2">
                              <input
                                type="text"
                                value={content.sectioncontentone}
                                onChange={(e) => {
                                  const updatedContent = section.sectioncontent.map((c, i) => (
                                    i === contentIndex ? { sectioncontentone: e.target.value } : c
                                  ));
                                  handleSectionChange(index, 'sectioncontent', updatedContent);
                                }}
                                className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm flex-1"
                              />
                            </li>
                          ))}
                          <div className='grid grid-cols-2 gap-5'>
                            <Button color="primary" className="mt-2 rounded-xl" onClick={() => handleAddResponsibility(index, 'sectioncontent')}>
                              Add Content
                            </Button>
                            <Button
                              className='mt-2 bg-white border-2 border-primary text-blue-700 font-medium'
                              onClick={() => handleRemoveResponsibility(index, section.sectioncontent.length - 1, 'sectioncontent')}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>

                        <div className='flex flex-col'>
                          <label className="text-gray-700">Quote:</label>
                          <input
                            type="text"
                            value={section.quote}
                            onChange={(e) => handleSectionChange(index, 'quote', e.target.value)}
                            className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm"
                          />
                        </div>

                        <div className='flex flex-col'>
                          <label className="text-gray-700">List:</label>
                          {section.list.map((listItem, listIndex) => (
                            <li key={listIndex} className="flex mb-2">
                              <input
                                type="text"
                                value={listItem.listone}
                                onChange={(e) => {
                                  const updatedList = section.list.map((l, i) => (
                                    i === listIndex ? { listone: e.target.value } : l
                                  ));
                                  handleSectionChange(index, 'list', updatedList);
                                }}
                                className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm flex-1"
                              />
                            </li>
                          ))}
                          <div className='grid grid-cols-2 gap-5'>
                            <Button color="primary" className="mt-2 rounded-xl" onClick={() => handleAddResponsibility(index, 'list')}>
                              Add List Item
                            </Button>
                            <Button
                              className='mt-2 bg-white border-2 border-primary text-blue-700 font-medium'
                              onClick={() => handleRemoveResponsibility(index, section.list.length - 1, 'list')}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>

                        <div className='flex flex-col'>
                          <label className="text-gray-700">Table Header:</label>
                          <input
                            type="text"
                            value={section.tableheader}
                            onChange={(e) => handleSectionChange(index, 'tableheader', e.target.value)}
                            className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm"
                          />
                        </div>

                        <div className='flex flex-col'>
                          <label className="text-gray-700">Table Description:</label>
                          <input
                            type="text"
                            value={section.tabledescription}
                            onChange={(e) => handleSectionChange(index, 'tabledescription', e.target.value)}
                            className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm"
                          />
                        </div>

                        <div className='flex flex-col'>
                          <label className="text-gray-700">Table Header One:</label>
                          {section.tableheaderone.map((header, headerIndex) => (
                            <li key={headerIndex} className="flex mb-2">
                              <input
                                type="text"
                                value={header.tableheading}
                                onChange={(e) => {
                                  const updatedHeaders = section.tableheaderone.map((h, i) => (
                                    i === headerIndex ? { tableheading: e.target.value } : h
                                  ));
                                  handleSectionChange(index, 'tableheaderone', updatedHeaders);
                                }}
                                className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm flex-1"
                              />
                            </li>
                          ))}
                          <div className='grid grid-cols-2 gap-5'>
                            <Button color="primary" className="mt-2 rounded-xl" onClick={() => handleAddResponsibility(index, 'tableheaderone')}>
                              Add Header
                            </Button>
                            <Button
                              className='mt-2 bg-white border-2 border-primary text-blue-700 font-medium'
                              onClick={() => handleRemoveResponsibility(index, section.tableheaderone.length - 1, 'tableheaderone')}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>

                        <div className='flex flex-col'>
                          <label className="text-gray-700">Table Description One:</label>
                          {section.tabledescriptionone.map((description, descriptionIndex) => (
                            <li key={descriptionIndex} className="flex mb-2">
                              <input
                                type="text"
                                value={description.tabledescriptionpara}
                                onChange={(e) => {
                                  const updatedDescriptions = section.tabledescriptionone.map((d, i) => (
                                    i === descriptionIndex ? { tabledescriptionpara: e.target.value } : d
                                  ));
                                  handleSectionChange(index, 'tabledescriptionone', updatedDescriptions);
                                }}
                                className="border border-gray-300 mt-2 p-2 rounded-md font-light text-sm flex-1"
                              />
                            </li>
                          ))}
                          <div className='grid grid-cols-2 gap-5'>
                            <Button color="primary" className="mt-2 rounded-xl" onClick={() => handleAddResponsibility(index, 'tabledescriptionone')}>
                              Add Description
                            </Button>
                            <Button
                              className='mt-2 bg-white border-2 border-primary text-blue-700 font-medium'
                              onClick={() => handleRemoveResponsibility(index, section.tabledescriptionone.length - 1, 'tabledescriptionone')}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className='grid grid-cols-2 gap-5 mt-8'>
                      <Button color="primary" className="mt-2 rounded-xl" onClick={handleAddSection}>
                        Add Section
                      </Button>
                      <Button
                        className='mt-2 bg-white border-2 border-primary text-blue-700 font-medium'
                        onClick={() => handleRemoveSection(sections.length - 1)}
                      >
                        Remove Section
                      </Button>
                    </div>
                  </div>

                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={handleblogform}>
                    Submit
                  </Button>
                  <Button className='bg-white border-2 border-primary text-blue-700 font-medium' onPress={handleClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full mt-5 gap-8">
          {fetchallblog && fetchallblog.map((e) => (
            <div className="rounded-2xl p-6 bg-gray-200" key={e._id}>
              <p className='font-semibold'>Blog Title: <span className='font-normal ml-1'>{e.title}</span></p>
              <p className='font-semibold mt-2'>ReadTime: <span className='font-normal ml-1'>{e.readTime}</span> </p>
              <p className='font-semibold mt-2'>Dated:<span className='font-normal ml-1'>
                {format(new Date(e.date), 'dd/MM/yyyy')}
              </span></p>
              <div className='grid grid-cols-2 gap-5 mt-[2rem]'>
                <Editblog id={e._id} />
                <div>
                  <Button className='mt-4 bg-gray-200 border-2 border-primary text-blue-700 font-medium ' onClick={() => deleteblog(e._id)}>
                    <span><Trash2 className='w-[15px] h-[15px]' /></span> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div >

    </>
  );
};

export default AddBlog;












