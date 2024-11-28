import React, { useState } from 'react';
import VisitorCreate from './VisitorCreate/VisitorCreate'; 
import VisitorStatus from './VisitorRecords/VisitorRecords';
function VisitorManager() {
  const [visitors, setVisitors] = useState([]);
console.log(visitors)
  const handleAddVisitor = (newVisitor) => {
    setVisitors([...visitors, newVisitor]);
  };

  const handleUpdateOutTime = (updatedVisitors) => {
   
    setVisitors(updatedVisitors);
  };


  return (
    <div>
      <VisitorCreate onVisitorAdded={handleAddVisitor} />
      <VisitorStatus visitors={visitors} onUpdateOutTime={handleUpdateOutTime} />
    </div>
  );
}

export default VisitorManager;
