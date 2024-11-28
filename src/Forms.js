const forms = [
  {
    name: "VPN Access",
    fields: [
      
      { label: "Date", name: "date", type: "date", placeholder: "Select a date" },
    
      { 
        label: "Priority", 
        name: "priority", 
        type: "select", 
        options: [
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" }
        ],
        placeholder: "Select priority" 
      },
      
      { label: "Purpose", name: "purpose", type: "textarea", placeholder: "Enter purpose" },
      // { 
      //   label: "Department Head Name", 
      //   name: "department_head_name", 
      //   type: "text", 
      //   placeholder: "Enter department head name" 
      // },
      { 
        label: "Department Head Email", 
        name: "department_head_email", 
        type: "email", 
        placeholder: "Enter department head email" 
      },
      { label: "Remarks", name: "remarks", type: "textarea", placeholder: "Enter remarks" },
    ],
  },


  {
    name: "REMOTE DESKTOP ACCESS–EXTERNAL VENDOR",
    fields: [
     
      { label: "Date", name: "date", type: "date", placeholder: "Select a date" },
      // { label: "Department", name: "department", type: "text", placeholder: "Enter your department" },
      { 
        label: "Priority", 
        name: "priority", 
        type: "select", 
        options: [
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" }
        ],
        placeholder: "Select priority" 
      },
      
      { label: "Purpose", name: "purpose", type: "textarea", placeholder: "Enter purpose" },
      { 
        label: "Department Head Name", 
        name: "department_head_name", 
        type: "text", 
        placeholder: "Enter department head name" 
      },
      { 
        label: "Department Head Email", 
        name: "department_head_email", 
        type: "email", 
        placeholder: "Enter department head email" 
      },
      { label: "Remarks", name: "remarks", type: "textarea", placeholder: "Enter remarks" },
    ],
  },



  {
    name: "INTERNET ACCESS APPROVAL",
    fields: [
      { label: "Name", name: "name", type: "text", placeholder: "Enter your name" },
      { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
      { label: "Description", name: "description", type: "textarea", placeholder: "Enter your description" },
    ],
  },



];

export default forms;
