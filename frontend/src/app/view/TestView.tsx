import React, { useState } from 'react';
import ListBox from '../components/Listbox/Listbox';

const options = [
  {name: 'Durward Reynolds'},
  {name: 'Kenton Towne'},
  {name: 'Therese Wunsch'},
  {name: 'Benedict Kessler'},
  {name: 'Katelyn Rohan'},
];

const TestView = () => {

  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="bg-gray-100 w-screen h-screen p-10">
      <ListBox
        options={options}
        selected={selected}
        setSelected={setSelected}/>
    </div>
  );
};

export default TestView;