import React, { useState, useEffect } from 'react';

// Custom Alert/Dialog Component to replace browser alerts
const AlertDialog = ({ message, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-ayu-bg-secondary rounded-lg shadow-xl border border-ayu-border p-6 w-full max-w-sm text-center transform transition-all duration-300 scale-100 opacity-100 font-mono">
        <h3 className="text-xl font-semibold text-ayu-accent-orange mb-4">Notification</h3>
        <p className="text-ayu-fg mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full btn-primary hover:btn-primary-hover font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75"
        >
          OK
        </button>
      </div>
    </div>
  );
};


// Main App component
const App = () => {
  // State to manage the current active page for content display. Initialized to null for intro screen.
  const [currentPage, setCurrentPage] = useState(null);
  // State to manage which main category button is currently active/highlighted.
  const [mainCategory, setMainCategory] = useState(null); // 'EVM', 'Erigon', 'OpGeth', 'Polygon PoS', 'Succinct SP1', 'Miden VM' or null
  // State for the custom alert dialog
  const [alertState, setAlertState] = useState({ message: '', isOpen: false });
  // State to control visibility of the detailed concept navigation buttons (Memory, Stack, etc.)
  // Set to false initially so they are hidden until a main button is clicked.
  const [showDetailConceptButtons, setShowDetailConceptButtons] = useState(false);
  // State to control visibility of the main category buttons (Ethereum Virtual Machine, Erigon, op-geth)
  const [showMainButtons, setShowMainButtons] = useState(true); // Initially true to show them on load

  // Detailed concept pages for EVM
  const evmDetailPages = [
    'Memory',
    'Stack',
    'Storage',
    'Program Counter',
    'Opcodes',
    'Execution Loop',
    'Environmental Info',
  ];

  // Detailed concept pages for Erigon
  const erigonDetailPages = [
    'Erigon Overview',
    'Stage-Based Sync',
    'MPT Optimization',
    'Architectural Differences',
  ];

  // Detailed concept pages for op-geth
  const opGethDetailPages = [
    'Op-Geth Overview',
    'Optimistic Rollups Context',
    'Sequencer Interaction',
    'Data Availability',
  ];

  // Detailed concept pages for Polygon PoS
  const polygonPoSDetailPages = [
    'Polygon PoS Bor',
    'Polygon PoS Heimdall',
  ];

  // Detailed concept pages for Succinct SP1
  const succinctSP1DetailPages = [
    'Succinct SP1 Overview',
  ];

  // Detailed concept pages for Miden VM
  const midenDetailPages = [
    'Miden VM Overview',
  ];


  // Function to show the custom alert
  const showAlert = (message) => {
    setAlertState({ message, isOpen: true });
  };

  // Function to close the custom alert
  const closeAlert = () => {
    setAlertState({ message: alertState.message, isOpen: false });
  };

  // Handler for the main "Ethereum Virtual Machine (EVM)" button click
  const handleEVMButtonClick = () => {
    setMainCategory('Ethereum Virtual Machine'); // Set EVM category as active, use full name for display
    setShowDetailConceptButtons(true); // Show detailed navigation buttons
    setCurrentPage('Memory'); // Set default page to Memory
    setShowMainButtons(false); // Hide main buttons after one is clicked
  };

  // Handler for "Erigon" button click
  const handleErigonClick = () => {
    setMainCategory('Erigon'); // Set Erigon category as active
    setShowDetailConceptButtons(true); // Show detailed navigation buttons
    setCurrentPage('Erigon Overview'); // Set default page to Erigon Overview
    setShowMainButtons(false); // Hide main buttons after one is clicked
  };

  // Handler for "op-geth" button click
  const handleOpGethClick = () => {
    setMainCategory('op-geth'); // Set OpGeth category as active
    setShowDetailConceptButtons(true); // Show detailed navigation buttons
    setCurrentPage('Op-Geth Overview'); // Set default page to Op-Geth Overview
    setShowMainButtons(false); // Hide main buttons after one is clicked
  };

  // Handler for "Polygon PoS" button click
  const handlePolygonPoSClick = () => {
    setMainCategory('Polygon PoS');
    setShowDetailConceptButtons(true);
    setCurrentPage('Polygon PoS Bor'); // Default to Bor page
    setShowMainButtons(false);
  };

  // Handler for "Succinct SP1" button click
  const handleSuccinctSP1Click = () => {
    setMainCategory('Succinct SP1');
    setShowDetailConceptButtons(true);
    setCurrentPage('Succinct SP1 Overview'); // Default to Succinct SP1 Overview page
    setShowMainButtons(false);
  };

  // Handler for "Miden VM" button click
  const handleMidenClick = () => {
    setMainCategory('Miden VM'); // Set Miden VM category as active
    setShowDetailConceptButtons(true); // Show detailed navigation buttons
    setCurrentPage('Miden VM Overview'); // Set default page to Miden VM Overview
    setShowMainButtons(false); // Hide main buttons after one is clicked
  };

  // Handler for "noob land" title click to return to the main page
  const handleNoobLandClick = () => {
    // When "noob land" is clicked, reset to initial state
    setMainCategory(null); // No main category selected
    setShowDetailConceptButtons(false); // Hide detailed navigation buttons
    setCurrentPage(null); // Set to null to show the blank area
    setShowMainButtons(true); // Show main buttons again
  };

  // Render the current page component based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'Memory':
        return <MemoryPage showAlert={showAlert} />;
      case 'Stack':
        return <StackPage showAlert={showAlert} />;
      case 'Storage':
        return <StoragePage showAlert={showAlert} />;
      case 'Program Counter':
        return <ProgramCounterPage />;
      case 'Opcodes':
        return <OpcodesPage />;
      case 'Execution Loop':
        return <ExecutionLoopPage />;
      case 'Environmental Info':
        return <EnvironmentalInfoPage />;
      // Erigon Pages
      case 'Erigon Overview':
        return <ErigonOverviewPage />;
      case 'Stage-Based Sync':
        return <ErigonStageBasedSyncPage />;
      case 'MPT Optimization':
        return <ErigonMPTOptimizationPage />;
      case 'Architectural Differences':
        return <ErigonArchitecturalDifferencesPage />;
      // Op-Geth Pages
      case 'Op-Geth Overview':
        return <OpGethOverviewPage />;
      case 'Optimistic Rollups Context':
        return <OpGethOptimisticRollupsContextPage />;
      case 'Sequencer Interaction':
        return <OpGethSequencerInteractionPage />;
      case 'Data Availability':
        return <OpGethDataAvailabilityPage />;
      // Polygon PoS Pages
      case 'Polygon PoS Bor':
        return <PolygonPoSBorPage />;
      case 'Polygon PoS Heimdall':
        return <PolygonPoSHeimdallPage />;
      // Succinct SP1 Pages
      case 'Succinct SP1 Overview':
        return <SuccinctSP1DetailedPage />; // Changed to the detailed page
      // Miden VM Pages
      case 'Miden VM Overview':
        return <MidenVMDetailedPage />; // Changed to the detailed Miden VM page
      default:
        // This case should ideally not be reached if currentPage is null as renderPage() won't be called if currentPage is null.
        // But as a fallback, if it somehow gets an unknown value, it handles it.
        return (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-ayu-accent-orange mb-4">Content Not Found</h2>
            <p className="text-ayu-fg-muted leading-relaxed max-w-2xl mx-auto">
              The requested page could not be loaded. Please select another concept.
            </p>
          </div>
        );
    }
  };

  // Determine which detail pages to show based on mainCategory
  const getCurrentDetailPages = () => {
    if (mainCategory === 'Ethereum Virtual Machine') {
      return evmDetailPages;
    } else if (mainCategory === 'Erigon') {
      return erigonDetailPages;
    } else if (mainCategory === 'op-geth') {
      return opGethDetailPages;
    } else if (mainCategory === 'Polygon PoS') {
        return polygonPoSDetailPages;
    } else if (mainCategory === 'Succinct SP1') {
        return succinctSP1DetailPages;
    } else if (mainCategory === 'Miden VM') {
        return midenDetailPages;
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-ayu-bg-primary text-ayu-fg font-mono p-4 sm:p-6 lg:p-8">
      {/* Title Bar */}
      <div className="w-full bg-ayu-bg-secondary text-ayu-fg py-3 mb-8 rounded-lg shadow-lg flex flex-col sm:flex-row justify-between items-center px-4 border border-ayu-border">
        <h1 className="text-lg sm:text-xl font-extrabold tracking-wide mb-2 sm:mb-0">
          {/* Only this span is clickable */}
          <span
            className="cursor-pointer hover:text-ayu-fg-muted transition-colors duration-200"
            onClick={handleNoobLandClick}
          >
            🌱noob land
          </span>
          {mainCategory && ( // Conditionally display mainCategory if it exists
            <span className="ml-2 text-sm sm:text-base font-normal text-ayu-fg-muted"> / {mainCategory}</span>
          )}
        </h1>
        {/* Link to X profile in the top right corner */}
        <a
          href="https://x.com/gobin00b"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ayu-fg-muted text-xs sm:text-sm hover:text-ayu-fg transition-colors duration-200"
        >
          @gobin00b
        </a>
      </div>

      {/* Header */}
      <header className="mb-8 text-center">
        {/* Conditionally render the "Click the buttons and explore concepts" text */}
        {showMainButtons && (
          <h1 className="text-lg sm:text-xl font-normal text-ayu-fg-muted mb-2 tracking-wide">
            Click the buttons and explore concepts
          </h1>
        )}
        
        {/* Main buttons with conditional highlighting and visibility */}
        {showMainButtons && (
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <button
              onClick={handleEVMButtonClick}
              className={`px-4 py-2 text-sm sm:px-6 sm:py-2 sm:text-base font-bold rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75
                ${mainCategory === 'Ethereum Virtual Machine' ? 'btn-primary' : 'bg-ayu-bg-secondary hover:bg-ayu-bg-tertiary text-ayu-fg border border-ayu-border'}`}
            >
              Ethereum Virtual Machine (EVM)
            </button>
            <button
              onClick={handleErigonClick}
              className={`px-4 py-2 text-sm sm:px-6 sm:py-2 sm:text-base font-bold rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75
                ${mainCategory === 'Erigon' ? 'btn-primary' : 'bg-ayu-bg-secondary hover:bg-ayu-bg-tertiary text-ayu-fg border border-ayu-border'}`}
            >
              Erigon
            </button>
            <button
              onClick={handleOpGethClick}
              className={`px-4 py-2 text-sm sm:px-6 sm:py-2 sm:text-base font-bold rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75
                ${mainCategory === 'op-geth' ? 'btn-primary' : 'bg-ayu-bg-secondary hover:bg-ayu-bg-tertiary text-ayu-fg border border-ayu-border'}`}
            >
              op-geth
            </button>
            <button
              onClick={handlePolygonPoSClick}
              className={`px-4 py-2 text-sm sm:px-6 sm:py-2 sm:text-base font-bold rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75
                ${mainCategory === 'Polygon PoS' ? 'btn-primary' : 'bg-ayu-bg-secondary hover:bg-ayu-bg-tertiary text-ayu-fg border border-ayu-border'}`}
            >
              Polygon PoS
            </button>
            <button
              onClick={handleSuccinctSP1Click}
              className={`px-4 py-2 text-sm sm:px-6 sm:py-2 sm:text-base font-bold rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75
                ${mainCategory === 'Succinct SP1' ? 'btn-primary' : 'bg-ayu-bg-secondary hover:bg-ayu-bg-tertiary text-ayu-fg border border-ayu-border'}`}
            >
              Succinct SP1
            </button>
            <button
              onClick={handleMidenClick}
              className={`px-4 py-2 text-sm sm:px-6 sm:py-2 sm:text-base font-bold rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75
                ${mainCategory === 'Miden VM' ? 'btn-primary' : 'bg-ayu-bg-secondary hover:bg-ayu-bg-tertiary text-ayu-fg border border-ayu-border'}`}
            >
              Miden VM
            </button>
          </div>
        )}

        {/* Detailed concept navigation buttons - conditionally rendered */}
        {showDetailConceptButtons && (
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {getCurrentDetailPages().map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`py-2 px-3 text-xs sm:px-4 sm:text-sm rounded-lg transition-all duration-300 ease-in-out font-medium border border-ayu-border
                  ${currentPage === page
                    ? 'bg-ayu-accent-green text-ayu-bg-primary shadow-md' // Green for selected
                    : 'bg-ayu-bg-tertiary hover:bg-ayu-bg-secondary text-ayu-fg' // Darker slate for non-selected
                  } focus:outline-none focus:ring-2 focus:ring-ayu-accent-green focus:ring-opacity-75`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main content area - conditionally rendered */}
      {currentPage !== null && ( // Only render the main content area if a page is selected
        <div className="flex flex-col lg:flex-row gap-6">
          <main className="flex-1 p-4 sm:p-6 bg-ayu-bg-secondary rounded-xl shadow-lg border border-ayu-border">
            {renderPage()}
          </main>
        </div>
      )}

      {/* Custom Alert Dialog */}
      <AlertDialog message={alertState.message} isOpen={alertState.isOpen} onClose={closeAlert} />
    </div>
  );
};

// ---------------------------------------------------
// Individual Page Components (Unchanged from previous versions, now includes Erigon and OpGeth explainers)
// ---------------------------------------------------

// Memory Page Component
const MemoryPage = ({ showAlert }) => {
  const [memory, setMemory] = useState(Array(16).fill(0)); // Simulate 16 bytes of memory
  const [address, setAddress] = useState(0);
  const [value, setValue] = useState(0);

  const handleMStore = () => {
    if (address >= 0 && address < memory.length) {
      const newMemory = [...memory];
      newMemory[address] = parseInt(value); // Store integer value
      setMemory(newMemory);
    } else {
      showAlert('Invalid address! Must be between 0 and 15.');
    }
  };

  const handleMLoad = () => {
    if (address >= 0 && address < memory.length) {
      showAlert(`Value at address ${address}: ${memory[address]}`);
    } else {
      showAlert('Invalid address! Must be between 0 and 15.');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-ayu-accent-orange">EVM Memory</h2>
      <p className="text-ayu-fg-muted mb-6 leading-relaxed text-sm sm:text-base">
        EVM Memory is a volatile, byte-addressable space used during contract execution. It's cleared
        between message calls and primarily used for temporary data storage, function arguments,
        and return values.
      </p>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border mb-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Current Memory State:</h3>
        <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-16 gap-1 sm:gap-2 text-center text-xs sm:text-sm">
          {memory.map((byte, index) => (
            <div
              key={index}
              className={`p-1 sm:p-2 rounded-md ${index === address ? 'bg-ayu-accent-blue text-ayu-bg-primary scale-105 transform transition-all duration-200' : 'bg-ayu-bg-secondary'} border border-ayu-border`}
            >
              <span className="text-xs text-ayu-fg-muted block">Addr {index}</span>
              <span className="text-base sm:text-lg text-ayu-fg">{byte}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Interact with Memory:</h3>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label htmlFor="memAddress" className="block text-ayu-fg text-sm font-bold mb-2">Address (0-15):</label>
            <input
              id="memAddress"
              type="number"
              value={address}
              onChange={(e) => setAddress(parseInt(e.target.value))}
              min="0"
              max={memory.length - 1}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-ayu-bg-primary leading-tight focus:outline-none focus:shadow-outline bg-ayu-fg"
            />
          </div>
          <div className="flex-1 w-full">
            <label htmlFor="memValue" className="block text-ayu-fg text-sm font-bold mb-2">Value (0-255):</label>
            <input
              id="memValue"
              type="number"
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value))}
              min="0"
              max="255"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-ayu-bg-primary leading-tight focus:outline-none focus:shadow-outline bg-ayu-fg"
            />
          </div>
          <div className="flex w-full sm:w-auto gap-3 mt-4 sm:mt-0">
            <button
              onClick={handleMStore}
              className="flex-1 btn-primary hover:btn-primary-hover font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75"
            >
              MSTORE
            </button>
            <button
              onClick={handleMLoad}
              className="flex-1 btn-secondary hover:btn-secondary-hover font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-green focus:ring-opacity-75"
            >
              MLOAD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stack Page Component
const StackPage = ({ showAlert }) => {
  const [stack, setStack] = useState([]);
  const [pushValue, setPushValue] = useState('');

  const handlePush = () => {
    if (pushValue === '') {
      showAlert('Please enter a value to push.');
      return;
    }
    const newValue = parseInt(pushValue);
    if (isNaN(newValue)) {
      showAlert('Invalid input. Please enter a number.');
      return;
    }
    setStack((prevStack) => [...prevStack, newValue]);
    setPushValue('');
  };

  const handlePop = () => {
    if (stack.length > 0) {
      setStack((prevStack) => prevStack.slice(0, prevStack.length - 1));
    } else {
      showAlert('Stack underflow! Cannot pop from an empty stack.');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-ayu-accent-orange">EVM Stack</h2>
      <p className="text-ayu-fg-muted mb-6 leading-relaxed text-sm sm:text-base">
        The EVM Stack is a LIFO (Last-In, First-Out) data structure that handles all intermediate
        calculations during contract execution. Most EVM opcodes operate by popping elements off the
        stack, performing an operation, and pushing the result back.
      </p>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border mb-6 flex-grow flex flex-col justify-end">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Current Stack State (Top is rightmost):</h3>
        {stack.length === 0 ? (
          <p className="text-ayu-fg-muted text-center py-8 text-sm sm:text-base">Stack is empty. Push some values!</p>
        ) : (
          <div className="flex flex-wrap-reverse gap-2 justify-end items-end max-h-64 overflow-y-auto">
            {stack.map((item, index) => (
              <div
                key={index}
                className="bg-ayu-accent-blue text-ayu-bg-primary p-2 sm:p-3 rounded-md shadow-md text-base sm:text-lg flex-shrink-0 min-w-[50px] sm:min-w-[60px] text-center"
                style={{ transition: 'all 0.3s ease-out' }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Interact with Stack:</h3>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label htmlFor="pushValue" className="block text-ayu-fg text-sm font-bold mb-2">Value to Push:</label>
            <input
              id="pushValue"
              type="number"
              value={pushValue}
              onChange={(e) => setPushValue(e.target.value)}
              placeholder="Enter number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-ayu-bg-primary leading-tight focus:outline-none focus:shadow-outline bg-ayu-fg"
            />
          </div>
          <div className="flex w-full sm:w-auto gap-3 mt-4 sm:mt-0">
            <button
              onClick={handlePush}
              className="flex-1 btn-primary hover:btn-primary-hover font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75"
            >
              PUSH
            </button>
            <button
              onClick={handlePop}
              className="flex-1 btn-danger hover:btn-danger-hover text-ayu-bg-primary font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-red focus:ring-opacity-75"
            >
              POP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Storage Page Component
const StoragePage = ({ showAlert }) => {
  const [storage, setStorage] = useState({}); // Use an object for key-value storage
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');

  const handleSStore = () => {
    if (keyInput === '') {
      showAlert('Please enter a key.');
      return;
    }
    setStorage((prevStorage) => ({
      ...prevStorage,
      [keyInput]: valueInput,
    }));
    setKeyInput('');
    setValueInput('');
  };

  const handleSLoad = () => {
    if (keyInput === '') {
      showAlert('Please enter a key to load.');
      return;
    }
    const loadedValue = storage[keyInput];
    if (loadedValue !== undefined) {
      showAlert(`Value for key '${keyInput}': ${loadedValue}`);
    } else {
      showAlert(`Key '${keyInput}' not found in storage.`);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-ayu-accent-orange">EVM Storage</h2>
      <p className="text-ayu-fg-muted mb-6 leading-relaxed text-sm sm:text-base">
        EVM Storage is a persistent key-value store associated with each contract. Unlike memory,
        storage is non-volatile and retains its state across transactions. It's the primary way for
        contracts to store data permanently on the blockchain. Both keys and values are 256-bit words.
        Modifying storage is the most expensive EVM operation due to its persistent nature.
      </p>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border mb-6 flex-grow">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Current Storage State:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 max-h-[calc(100vh-350px)] overflow-y-auto">
          {Object.entries(storage).map(([key, value]) => (
            <div key={key} className="bg-ayu-bg-secondary p-3 sm:p-4 rounded-md shadow-sm border border-ayu-border text-sm sm:text-base">
                <span className="text-ayu-accent-green font-bold">Key:</span> <span className="text-ayu-fg break-words">{key}</span><br/>
                <span className="text-ayu-fg-muted font-bold">Value:</span> <span className="text-ayu-fg break-words">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Interact with Storage:</h3>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label htmlFor="keyInput" className="block text-ayu-fg text-sm font-bold mb-2">Key:</label>
            <input
              id="keyInput"
              type="text"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Enter key"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-ayu-bg-primary leading-tight focus:outline-none focus:shadow-outline bg-ayu-fg"
            />
          </div>
          <div className="flex-1 w-full">
            <label htmlFor="valueInput" className="block text-ayu-fg text-sm font-bold mb-2">Value:</label>
            <input
              id="valueInput"
              type="text"
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
              placeholder="Enter value"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-ayu-bg-primary leading-tight focus:outline-none focus:shadow-outline bg-ayu-fg"
            />
          </div>
          <div className="flex w-full sm:w-auto gap-3 mt-4 sm:mt-0">
            <button
              onClick={handleSStore}
              className="flex-1 btn-primary hover:btn-primary-hover font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75"
            >
              SSTORE
            </button>
            <button
              onClick={handleSLoad}
              className="flex-1 btn-secondary hover:btn-secondary-hover font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-green focus:ring-opacity-75"
            >
              SLOAD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Program Counter Page Component
const ProgramCounterPage = () => {
  const bytecode = [
    { op: "PUSH1", arg: "0x0A" }, // Push 10
    { op: "PUSH1", arg: "0x05" }, // Push 5
    { op: "ADD" },                 // Add
    { op: "PUSH1", arg: "0x02" }, // Push 2
    { op: "MUL" },                 // Multiply
    { op: "STOP" },                // Stop
  ];
  const [pc, setPc] = useState(0);

  const handleNextInstruction = () => {
    setPc((prevPc) => (prevPc + 1) % bytecode.length);
  };

  const handleReset = () => {
    setPc(0);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-ayu-accent-orange">EVM Program Counter (PC)</h2>
      <p className="text-ayu-fg-muted mb-6 leading-relaxed text-sm sm:text-base">
        The Program Counter (PC) is a pointer that indicates the address of the current
        instruction (opcode) being executed by the EVM. After an opcode is executed,
        the PC automatically advances to the next instruction. For opcodes that take
        arguments (like PUSH), the PC advances past the opcode and its arguments.
      </p>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border mb-6 flex-grow">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Simulated Bytecode:</h3>
        <div className="font-mono text-base sm:text-lg space-y-2 max-h-64 overflow-y-auto">
          {bytecode.map((instruction, index) => (
            <p
              key={index}
              className={`p-2 rounded-md transition-all duration-200 ease-in-out
                ${index === pc ? 'bg-ayu-accent-blue text-ayu-bg-primary scale-105 transform transition-all duration-200' : 'text-ayu-fg'}
                ${index < pc ? 'opacity-50' : ''}
              `}
            >
              <span className="text-xs text-ayu-fg-muted block">Addr {index}</span>
              <span className="text-base sm:text-lg">{instruction.op}</span> {instruction.arg ? instruction.arg : ''}
            </p>
          ))}
        </div>
        <p className="text-lg sm:text-xl text-ayu-accent-green font-bold mt-4">
          Current PC: <span className="text-ayu-accent-orange">{pc}</span> (Instruction:{" "}
          <span className="text-ayu-accent-orange">
            {bytecode[pc].op} {bytecode[pc].arg || ''}
          </span>)
        </p>
      </div>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Controls:</h3>
        <div className="flex gap-4">
          <button
            onClick={handleNextInstruction}
            className="flex-1 btn-primary hover:btn-primary-hover font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75"
            >
            Next Instruction
          </button>
          <button
            onClick={handleReset}
            className="flex-1 btn-danger hover:btn-danger-hover text-ayu-bg-primary font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-red focus:ring-opacity-75"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

// Opcodes Page Component
const OpcodesPage = () => {
  const opcodes = [
    { name: 'STOP', desc: 'Halts execution.' },
    { name: 'ADD', desc: 'Pops two items, adds them, pushes result.' },
    { name: 'MUL', desc: 'Pops two items, multiplies them, pushes result.' },
    { name: 'SUB', desc: 'Pops two items, subtracts them, pushes result.' },
    { name: 'DIV', desc: 'Pops two items, divides them, pushes result.' },
    { name: 'PUSH1-32', desc: 'Pushes 1 to 32 bytes onto the stack.' },
    { name: 'POP', desc: 'Removes one item from the stack.' },
    { name: 'MLOAD', desc: 'Loads a 32-byte word from memory.' },
    { name: 'MSTORE', desc: 'Saves a 32-byte word to memory.' },
    { name: 'SLOAD', desc: 'Loads a 32-byte word from storage.' },
    { name: 'SSTORE', desc: 'Saves a 32-byte word to storage.' },
    { name: 'JUMP', desc: 'Unconditionally changes the program counter.' },
    { name: 'JUMPI', desc: 'Conditionally changes the program counter.' },
    { name: 'CALL', desc: 'Creates a message call.' },
    { name: 'RETURN', desc: 'Halts execution, returns output data.' },
    { name: 'REVERT', desc: 'Halts execution, reverts state changes.' },
    { name: 'GAS', desc: 'Gets the amount of gas left.' },
    { name: 'CALLER', desc: 'Gets the address of the caller.' },
    { name: 'CALLVALUE', desc: 'Gets the value (in Wei) sent with the call.' },
  ];

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-ayu-accent-orange">EVM Opcodes</h2>
      <p className="text-ayu-fg-muted mb-6 leading-relaxed text-sm sm:text-base">
        EVM Opcodes are the low-level instructions that the Ethereum Virtual Machine executes.
        Each opcode performs a specific operation, manipulating data on the stack, memory, or storage,
        or interacting with the blockchain environment. There are hundreds of opcodes, each with a
        defined gas cost.
      </p>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border flex-grow">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Common Opcodes:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 max-h-[calc(100vh-350px)] overflow-y-auto pr-2">
          {opcodes.map((opcode, index) => (
            <div key={index} className="bg-ayu-bg-secondary p-3 sm:p-4 rounded-md shadow-sm border border-ayu-border">
              <h4 className="font-bold text-base sm:text-lg text-ayu-accent-green">{opcode.name}</h4>
              <p className="text-ayu-fg text-sm sm:text-base">{opcode.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Execution Loop Page Component
const ExecutionLoopPage = () => {
  // Simulate a simple bytecode execution
  const bytecodeSequence = [
    { op: "PUSH1 0x05", gasCost: 3, effect: "Push 5 onto stack" },
    { op: "PUSH1 0x03", gasCost: 3, effect: "Push 3 onto stack" },
    { op: "ADD", gasCost: 3, effect: "Pop 3, 5; Push 8" },
    { op: "PUSH1 0x02", gasCost: 3, effect: "Push 2 onto stack" },
    { op: "MUL", gasCost: 5, effect: "Pop 2, 8; Push 16" },
    { op: "STOP", gasCost: 0, effect: "Halt execution" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [currentStack, setCurrentStack] = useState([]);
  const [gasRemaining, setGasRemaining] = useState(100);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionMessage, setExecutionMessage] = useState("");

  const resetExecution = () => {
    setCurrentStep(0);
    setCurrentStack([]);
    setGasRemaining(100);
    setIsExecuting(false);
    setExecutionMessage("");
  };

  const stepExecution = () => {
    if (currentStep >= bytecodeSequence.length) {
      setExecutionMessage("Execution finished. Please reset.");
      setIsExecuting(false);
      return;
    }

    const instruction = bytecodeSequence[currentStep];
    if (gasRemaining < instruction.gasCost) {
      setExecutionMessage("Out of gas! Execution halted.");
      setIsExecuting(false);
      return;
    }

    setGasRemaining((prevGas) => prevGas - instruction.gasCost);

    // Simulate stack changes based on effect description
    let newStack = [...currentStack];
    if (instruction.op.startsWith("PUSH")) {
      const value = parseInt(instruction.op.split(" ")[1], 16);
      newStack.push(value);
    } else if (instruction.op === "ADD") {
      if (newStack.length >= 2) {
        const b = newStack.pop();
        const a = newStack.pop();
        newStack.push(a + b);
      }
    } else if (instruction.op === "MUL") {
      if (newStack.length >= 2) {
        const b = newStack.pop();
        const a = newStack.pop();
        newStack.push(a * b);
      }
      }
    else if (instruction.op === "STOP") {
        setExecutionMessage("STOP opcode executed. Execution halted.");
        setIsExecuting(false);
    }
    setCurrentStack(newStack);
    setCurrentStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    if (isExecuting && currentStep < bytecodeSequence.length) {
      const timer = setTimeout(() => {
        stepExecution();
      }, 1000); // Step every 1 second for visualization
      return () => clearTimeout(timer);
    } else if (isExecuting && currentStep >= bytecodeSequence.length) {
      setExecutionMessage("Execution completed!");
      setIsExecuting(false);
    }
  }, [currentStep, isExecuting, bytecodeSequence]); // Added bytecodeSequence to deps for completeness

  const toggleExecution = () => {
    if (!isExecuting && currentStep >= bytecodeSequence.length) {
      resetExecution(); // Reset if finished before starting again
    }
    setIsExecuting(!isExecuting);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-ayu-accent-orange">EVM Execution Loop</h2>
      <p className="text-ayu-fg-muted mb-6 leading-relaxed text-sm sm:text-base">
        The EVM execution loop continuously fetches the next opcode, decrements gas,
        executes the instruction, and updates the Program Counter. This process repeats
        until a `STOP` or `RETURN` opcode is encountered, or an error (like "out of gas") occurs.
      </p>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border mb-6 flex-grow">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Simulated Execution:</h3>

        <div className="mb-4 text-sm sm:text-base">
          <p className="text-ayu-fg">
            <span className="font-bold">Gas Remaining:</span>{" "}
            <span className="text-ayu-accent-orange text-lg sm:text-xl">{gasRemaining}</span>
          </p>
          <p className="text-ayu-fg">
            <span className="font-bold">Current Instruction:</span>{" "}
            <span className="text-ayu-accent-green text-lg sm:text-xl">
              {currentStep < bytecodeSequence.length
                ? bytecodeSequence[currentStep].op
                : "Finished"
              }
            </span>
          </p>
          <p className="text-ayu-fg-muted text-xs sm:text-sm">
            <span className="font-bold">Effect:</span>{" "}
            <span className="text-ayu-fg-muted">
              {currentStep < bytecodeSequence.length
                ? bytecodeSequence[currentStep].effect
                : ""
              }
            </span>
          </p>
          {executionMessage && (
              <p className="text-ayu-accent-red mt-2 font-semibold text-sm sm:text-base">{executionMessage}</p>
          )}
        </div>

        <h4 className="text-base sm:text-lg font-semibold mb-2 text-ayu-accent-green">Bytecode Trace:</h4>
        <div className="font-mono text-xs sm:text-sm space-y-1 max-h-48 overflow-y-auto bg-ayu-bg-secondary p-3 rounded-md">
          {bytecodeSequence.map((inst, index) => (
            <p
              key={index}
              className={`${index === currentStep ? 'bg-ayu-accent-green text-ayu-bg-primary font-bold rounded-md px-2 py-1' : 'text-ayu-fg'}`}
            >
              {`0x${index.toString(16).padStart(2, '0')}: ${inst.op} (Gas: ${inst.gasCost})`}
            </p>
          ))}
        </div>
      </div>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Controls:</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={toggleExecution}
            className={`flex-1 ${isExecuting ? 'bg-ayu-accent-orange hover:btn-primary-hover' : 'btn-primary hover:btn-primary-hover'} text-ayu-bg-primary font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75`}
          >
            {isExecuting ? 'Pause' : (currentStep >= bytecodeSequence.length ? 'Restart' : 'Start')}
          </button>
          <button
            onClick={stepExecution}
            disabled={isExecuting || currentStep >= bytecodeSequence.length}
            className="flex-1 btn-secondary hover:btn-secondary-hover text-ayu-bg-primary font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-green focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step
          </button>
          <button
            onClick={resetExecution}
            className="flex-1 btn-danger hover:btn-danger-hover text-ayu-bg-primary font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-red focus:ring-opacity-75"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

// Environmental Info Page Component
const EnvironmentalInfoPage = () => {
  const envInfo = [
    { name: 'CALLER', desc: 'Address of the account that called the current contract.', example: '0xabc...123' },
    { name: 'CALLVALUE', desc: 'The amount of Wei sent with the current message call.', example: '1000000000000000 (1 ETH)' },
    { name: 'CALLDATA', desc: 'The input data of the current message call.', example: '0x1234abcd...' },
    { name: 'ADDRESS', desc: 'The address of the currently executing contract.', example: '0xdef...456' },
    { name: 'BALANCE', desc: 'The balance (in Wei) of the account at the given address.', example: '5000000000000000000 (5 ETH)' },
    { name: 'GASPRICE', desc: 'The gas price of the transaction that originated this execution.', example: '20 Gwei' },
    { name: 'ORIGIN', desc: 'The address of the account that sent the original transaction.', example: '0xabc...123' },
    { name: 'COINBASE', desc: 'The address of the current block miner.', example: '0xminer...789' },
    { name: 'TIMESTAMP', desc: 'The Unix timestamp of the current block.', example: '1678886400 (March 15, 2023)' },
    { name: 'NUMBER', desc: 'The current block number.', example: '18,000,000' },
    { name: 'DIFFICULTY', desc: 'The difficulty of the current block.', example: '587989786432' },
    { name: 'GASLIMIT', desc: 'The block gas limit for the current block.', example: '30,000,000' },
    { name: 'BLOCKHASH', desc: 'The hash of one of the 256 most recent complete blocks.', example: '0xhash...abc' },
  ];

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-ayu-accent-orange">EVM Environmental Information</h2>
      <p className="text-ayu-fg-muted mb-6 leading-relaxed text-sm sm:text-base">
        The EVM can access various pieces of information about the current transaction,
        block, and call context through special "environmental" opcodes. This information
        is crucial for smart contracts to make decisions based on the current state of the blockchain.
      </p>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border flex-grow">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Key Environmental Variables:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 max-h-[calc(100vh-350px)] overflow-y-auto pr-2">
          {envInfo.map((info, index) => (
            <div key={index} className="bg-ayu-bg-secondary p-3 sm:p-4 rounded-md shadow-sm border border-ayu-border">
              <h4 className="font-bold text-base sm:text-lg text-ayu-accent-green">{info.name}</h4>
              <p className="text-ayu-fg text-sm sm:text-base">{info.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Erigon Pages
const ErigonOverviewPage = () => (
  <div className="flex flex-col h-full items-center justify-center text-center">
    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-ayu-accent-orange">Erigon: Overview</h2>
    <p className="text-ayu-fg-muted mb-6 leading-relaxed max-w-full sm:max-w-2xl text-sm sm:text-base">
      Erigon (formerly TurboGeth) is an Ethereum client designed for efficiency and modularity.
      It aims to significantly reduce disk space usage and synchronize much faster than other clients
      by rethinking how blockchain data is stored and processed.
    </p>
    <p className="text-ayu-fg-muted mt-4 text-sm sm:text-base">
      Explore its key features using the navigation above.
    </p>
  </div>
);

const ErigonStageBasedSyncPage = () => {
  const stages = [
    { name: 'Headers Download', description: 'Downloads and validates all block headers efficiently.' },
    { name: 'Block Bodies Download', description: 'Fetches the full block data (transactions, uncles) for downloaded headers.' },
    { name: 'Execution & State Build', description: 'Executes transactions, builds the Merkle Patricia Trie state, and calculates state roots.' },
    { name: 'Hashing & Verification', description: 'Verifies the integrity of the state and historical data through hashing and Merkle proofs.' },
    { name: 'Snapshots Generation', description: 'Creates compact, optimized snapshots of the chain state for faster future access.' },
    { name: 'Sync Complete!', description: 'The Erigon client is fully synchronized and ready for use.' },
  ];

  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('Click "Start Sync" to begin the stage-based synchronization process.');

  const startSync = () => {
    setCurrentStageIndex(0);
    setIsSyncing(true);
    setSyncMessage(`Starting synchronization with: ${stages[0].name}`);
  };

  const nextStage = () => {
    if (currentStageIndex < stages.length - 1) {
      setCurrentStageIndex(prevIndex => prevIndex + 1);
      setSyncMessage(`Processing: ${stages[currentStageIndex + 1].name}`);
    } else {
      setIsSyncing(false);
      setSyncMessage(stages[stages.length - 1].description);
    }
  };

  const resetSync = () => {
    setCurrentStageIndex(0);
    setIsSyncing(false);
    setSyncMessage('Sync reset. Click "Start Sync" to begin again.');
  };

  useEffect(() => {
    if (isSyncing && currentStageIndex < stages.length - 1) {
      const timer = setTimeout(() => {
        nextStage();
      }, 2000); // Advance every 2 seconds for demonstration
      return () => clearTimeout(timer);
    }
  }, [isSyncing, currentStageIndex, stages.length]);


  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-ayu-accent-orange">Erigon: Stage-Based Sync (Interactive)</h2>
      <p className="text-ayu-fg-muted mb-6 leading-relaxed text-sm sm:text-base">
        Erigon's synchronization process is broken down into distinct, sequential stages.
        This modular approach allows for highly optimized, parallel processing and efficient
        disk I/O, leading to significantly faster initial sync times compared to other clients.
      </p>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border mb-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Sync Progress:</h3>
          <div className="space-y-3">
            {stages.slice(0, stages.length - 1).map((stage, index) => (
              <div key={index} className={`flex items-center ${index < currentStageIndex ? 'opacity-50' : ''}`}>
                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center mr-2 sm:mr-3 transition-colors duration-300
                  ${index < currentStageIndex ? 'bg-ayu-accent-green text-ayu-bg-primary' : index === currentStageIndex ? 'bg-ayu-accent-orange animate-pulse text-ayu-bg-primary' : 'bg-ayu-bg-secondary text-ayu-fg'}`}>
                  {index < currentStageIndex ? '✔' : index + 1}
                </div>
                <p className={`text-sm sm:text-lg transition-colors duration-300 ${index === currentStageIndex ? 'text-ayu-accent-orange font-bold' : 'text-ayu-fg'}`}>
                  {stage.name}
                </p>
              </div>
            ))}
          </div>
          <p className="text-base sm:text-lg text-ayu-accent-orange font-bold mt-4">{syncMessage}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Current Stage Explanation:</h3>
          <p className="text-ayu-fg leading-relaxed text-sm sm:text-md">
            {stages[currentStageIndex].description}
          </p>
        </div>
      </div>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Controls:</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={startSync}
            disabled={isSyncing && currentStageIndex < stages.length -1}
            className="flex-1 btn-primary hover:btn-primary-hover text-ayu-bg-primary font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Sync
          </button>
          <button
            onClick={nextStage}
            disabled={!isSyncing || currentStageIndex >= stages.length - 1}
            className="flex-1 btn-secondary hover:btn-secondary-hover text-ayu-bg-primary font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-green focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Stage (Manual)
          </button>
          <button
            onClick={resetSync}
            className="flex-1 btn-danger hover:btn-danger-hover text-ayu-bg-primary font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-red focus:ring-opacity-75"
          >
            Reset Sync
          </button>
        </div>
      </div>
    </div>
  );
};

const ErigonMPTOptimizationPage = () => {
  const [nodes, setNodes] = useState([
    { id: 'root', label: 'Root Node', type: 'traditional', size: 'large' },
    { id: 'node1', label: 'Node A', type: 'traditional', size: 'medium' },
    { id: 'node2', label: 'Node B', type: 'traditional', size: 'medium' },
    { id: 'node3', label: 'Node C', type: 'traditional', size: 'small' },
    { id: 'node4', label: 'Node D', type: 'traditional', size: 'small' },
  ]);

  const [description, setDescription] = useState(
    'Traditional MPT storage often leads to redundant data and inefficient disk usage due to its tree-like structure, where common prefixes or subtrees are duplicated.'
  );

  const applyOptimization = () => {
    setNodes([
      { id: 'root', label: 'Root Node', type: 'optimized', size: 'large' },
      { id: 'node1', label: 'Flat Data Entry A', type: 'optimized', size: 'medium' },
      { id: 'node2', label: 'Flat Data Entry B', type: 'optimized', size: 'medium' },
      { id: 'node_optimized', label: 'Optimized State', type: 'optimized', size: 'large' },
    ]);
    setDescription(
      'Erigon optimizes MPT by flattening the storage and minimizing redundant data. It transforms the tree into a highly compact key-value store, significantly reducing disk space and improving data access speed.'
    );
  };

  const resetOptimization = () => {
    setNodes([
      { id: 'root', label: 'Root Node', type: 'traditional', size: 'large' },
      { id: 'node1', label: 'Node A', type: 'traditional', size: 'medium' },
      { id: 'node2', label: 'Node B', type: 'traditional', size: 'medium' },
      { id: 'node3', label: 'Node C', type: 'traditional', size: 'small' },
    ]);
    setDescription(
      'Traditional MPT storage often leads to redundant data and inefficient disk usage due to its tree-like structure, where common prefixes or subtrees are duplicated.'
    );
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-ayu-accent-orange">Erigon: Merkle Patricia Trie Optimization (Interactive)</h2>
      <p className="text-ayu-fg-muted mb-6 leading-relaxed text-sm sm:text-base">
        This interactive visualization demonstrates how Erigon optimizes the storage of the Merkle Patricia Trie (MPT),
        a key data structure in Ethereum's state.
      </p>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border mb-6 flex-grow flex flex-col items-center justify-center">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-ayu-accent-green">MPT State Representation:</h3>
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 py-4">
          {nodes.map((node) => (
            <div
              key={node.id}
              className={`rounded-full flex items-center justify-center text-center text-ayu-fg transition-all duration-500 ease-in-out
                ${node.type === 'traditional' ? 'bg-ayu-accent-red' : 'bg-ayu-accent-green'}
                ${node.size === 'large' ? 'w-24 h-24 text-sm sm:w-32 sm:h-32 sm:text-base' : node.size === 'medium' ? 'w-20 h-20 text-xs sm:w-24 sm:h-24 sm:text-sm' : 'w-14 h-14 text-xs sm:w-16 sm:h-16 sm:text-xs'}
                shadow-lg border border-ayu-border transform hover:scale-105`}
              style={{ flexShrink: 0 }}
            >
              <p className="p-1 sm:p-2">{node.label}</p>
            </div>
          ))}
        </div>
        <p className="text-ayu-fg-muted text-center mt-6 max-w-full sm:max-w-2xl text-sm sm:text-base">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={applyOptimization}
            className="flex-1 btn-primary hover:btn-primary-hover text-ayu-bg-primary font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75"
          >
            Apply Erigon Optimization
          </button>
          <button
            onClick={resetOptimization}
            className="flex-1 btn-danger hover:btn-danger-hover text-ayu-bg-primary font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-red focus:ring-opacity-75"
          >
            Reset to Traditional MPT
          </button>
        </div>
      </div>
    </div>
  );
};

const ErigonArchitecturalDifferencesPage = () => {
  const [architectureType, setArchitectureType] = useState('monolithic'); // 'monolithic' or 'modular'

  const monolithicComponents = [
    { name: 'Networking', icon: 'Net' },
    { name: 'Consensus', icon: 'Con' },
    { name: 'Execution', icon: 'Exec' },
    { name: 'Storage', icon: 'Stor' },
    { name: 'RPC Server', icon: 'RPC' },
  ];

  const modularComponents = [
    { name: 'P2P Network', icon: 'P2P', group: 'Networking' },
    { name: 'Header Downloader', icon: 'Hdr', group: 'Sync' },
    { name: 'Block Fetcher', icon: 'Blk', group: 'Sync' },
    { name: 'Tx Pool', icon: 'TxP', group: 'Execution' },
    { name: 'EVM Executor', icon: 'EVM', group: 'Execution' },
    { name: 'State DB', icon: 'DB', group: 'Storage' },
    { name: 'RPC Server', icon: 'RPC', group: 'Interface' },
  ];

  const toggleArchitecture = () => {
    setArchitectureType(prevType => prevType === 'monolithic' ? 'modular' : 'monolithic');
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-ayu-accent-orange">Erigon: Architectural Differences (Interactive)</h2>
      <p className="text-ayu-fg-muted mb-6 leading-relaxed text-sm sm:text-base">
        This interactive explainer illustrates the fundamental architectural differences between
        traditional monolithic Ethereum clients (like Geth) and Erigon's modular design.
      </p>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border mb-6 flex-grow flex flex-col items-center justify-center">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-ayu-accent-green">
          Current View: {architectureType === 'monolithic' ? 'Monolithic Architecture (e.g., Geth)' : 'Modular Architecture (Erigon)'}
        </h3>
        <div className="w-full max-w-full sm:max-w-2xl bg-ayu-bg-primary p-4 sm:p-6 rounded-lg shadow-lg min-h-[200px] flex items-center justify-center relative transition-all duration-500 ease-in-out">
          {architectureType === 'monolithic' ? (
            <div className="w-full h-full p-4 border-4 border-ayu-accent-red rounded-lg flex flex-col items-center justify-center bg-ayu-accent-red bg-opacity-30">
              <span className="text-5xl sm:text-6xl mb-2 sm:mb-4 text-ayu-fg">🏛️</span>
              <p className="text-lg sm:text-2xl font-bold text-ayu-accent-red">Single, Integrated Process</p>
              <div className="text-ayu-accent-red text-xs sm:text-sm mt-2 text-center">
                {monolithicComponents.map((comp, index) => (
                  <span key={index} className="inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 bg-ayu-accent-red rounded-md m-0.5 sm:m-1 text-ayu-fg">
                    {comp.icon} {comp.name}
                  </span>
                ))}
                <p className="mt-3 text-ayu-accent-red">All components tightly coupled.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 w-full h-full transition-all duration-500 ease-in-out">
              {modularComponents.map((comp, index) => (
                <div key={index} className="flex flex-col items-center justify-center p-2 sm:p-3 bg-ayu-accent-green bg-opacity-30 border-2 border-ayu-accent-green rounded-lg text-center">
                  <span className="text-2xl sm:text-3xl mb-1">{comp.icon}</span>
                  <p className="text-xs sm:text-sm font-semibold text-ayu-accent-green">{comp.name}</p>
                  <p className="text-xs text-ayu-accent-green">{comp.group}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <p className="text-ayu-fg-muted text-center mt-6 max-w-full sm:max-w-2xl text-sm sm:text-base">
          {architectureType === 'monolithic'
            ? 'In a monolithic architecture, all functionalities (networking, execution, storage) are combined into a single, tightly coupled application. This can simplify initial development but often leads to challenges in scaling, maintenance, and debugging.'
            : 'Erigon\'s modular architecture breaks down the client into distinct, specialized processes or "stages." Each module handles a specific task, communicating with others. This design enhances parallelism, resource utilization, and makes components easier to develop, test, and maintain independently.'
          }
        </p>
      </div>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Controls:</h3>
        <button
          onClick={toggleArchitecture}
          className="w-full btn-primary hover:btn-primary-hover text-ayu-bg-primary font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75"
        >
          Toggle to {architectureType === 'monolithic' ? 'Modular Architecture' : 'Monolithic Architecture'}
        </button>
      </div>
    </div>
  );
};

// op-geth Pages
const OpGethOverviewPage = () => (
  <div className="flex flex-col h-full items-center justify-center text-center">
    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-ayu-accent-orange">op-geth: Overview</h2>
    <p className="text-ayu-fg-muted mb-6 leading-relaxed max-w-full sm:max-w-2xl text-sm sm:text-base">
      op-geth is a modified version of Geth (Go-Ethereum) specifically developed
      to serve as the execution client for Optimism's Layer 2 (L2) blockchain.
      It's designed to process and sequence transactions efficiently within the
      Optimistic Rollup framework, ensuring compatibility with Ethereum while
      providing higher throughput and lower fees.
    </p>
    <p className="text-ayu-fg-muted mt-4 text-sm sm:text-base">
      Explore its key functions and role in Optimism using the navigation above.
    </p>
  </div>
);

const OpGethOptimisticRollupsContextPage = () => {
  const rollupStages = [
    { name: 'L2 Tx', description: 'User initiates a transaction on Layer 2 (Optimism).', icon: '➡️' },
    { name: 'Sequencer Processing', description: 'The Sequencer receives and executes the L2 transaction, updating the L2 state.', icon: '🧠' },
    { name: 'Batch Submission to L1', description: 'Sequencer batches multiple L2 transactions and posts the batch data to Ethereum (Layer 1).', icon: '📦' },
    { name: 'Dispute Window', description: 'A time period (e.g., 7 days) during which anyone can challenge the validity of the L2 state transition by submitting a fraud proof.', icon: '⚖️' },
    { name: 'State Finalized (No Fraud)', description: 'If no valid fraud proof is submitted during the dispute window, the L2 state is considered final on L1.', icon: '✅' },
    { name: 'Fraud Proof (If Applicable)', description: 'If an invalid state transition is detected, a fraud proof is submitted to L1 to revert the incorrect L2 state.', icon: '🚨' },
    { name: 'Rollup Cycle Complete', description: 'The transaction cycle, including potential dispute resolution, is completed.', icon: '🏁' },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [currentDescription, setCurrentDescription] = useState(rollupStages[0].description);
  const [message, setMessage] = useState('Click "Next Step" to follow an Optimistic Rollup transaction.');

  const handleNextStep = () => {
    if (currentStep < rollupStages.length - 1) {
      const nextIndex = currentStep + 1;
      setCurrentStep(nextIndex);
      setCurrentDescription(rollupStages[nextIndex].description);
      setMessage(`Currently: ${rollupStages[nextIndex].name}`);
    } else {
      setMessage("Rollup cycle visualization complete. Reset to restart.");
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCurrentDescription(rollupStages[0].description);
    setMessage('Click "Next Step" to follow an Optimistic Rollup transaction.');
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-ayu-accent-orange">op-geth: Optimistic Rollups Context (Interactive)</h2>
      <p className="text-ayu-fg-muted mb-6 leading-relaxed text-sm sm:text-base">
        Visualize how transactions flow through an Optimistic Rollup, from Layer 2 execution to
        Layer 1 finalization, including the crucial role of fraud proofs.
      </p>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border mb-6 flex-grow">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Rollup Flow:</h3>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4">
          {rollupStages.map((stage, index) => (
            <div key={index} className={`flex flex-col items-center text-center p-2 sm:p-4 rounded-lg border-2
              ${index === currentStep ? 'bg-ayu-accent-blue border-ayu-accent-blue text-ayu-bg-primary' : 'bg-ayu-bg-secondary border-ayu-border text-ayu-fg opacity-70'}
              transition-all duration-300 ease-in-out w-24 h-24 sm:w-28 sm:h-28`}>
              <span className="text-2xl sm:text-3xl mb-1">{stage.icon}</span>
              <p className="text-xs sm:text-sm font-bold">{stage.name}</p>
            </div>
          ))}
        </div>
        <p className="text-base sm:text-lg font-bold text-ayu-accent-blue text-center mt-5">{message}</p>

        <div className="mt-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Current Step Details:</h3>
          <p className="text-ayu-fg leading-relaxed text-sm sm:text-base">{currentDescription}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button onClick={handleNextStep} disabled={currentStep >= rollupStages.length - 1} className="flex-1 btn-primary hover:btn-primary-hover text-ayu-bg-primary font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed">Next Step</button>
          <button onClick={handleReset} className="flex-1 btn-danger hover:btn-danger-hover text-ayu-bg-primary font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-red focus:ring-opacity-75">Reset</button>
        </div>
      </div>
    </div>
  );
};

const OpGethSequencerInteractionPage = () => {
  const interactionSteps = [
    { name: 'User Submits Tx (L2)', description: 'A user sends an Ethereum transaction to the Optimism network.', icon: '⬆️' },
    { name: 'Sequencer Receives Tx', description: 'The Optimism Sequencer receives the L2 transaction.', icon: '📩' },
    { name: 'op-geth Executes Tx', description: 'The Sequencer feeds the transaction to op-geth, which executes it against the current L2 state.', icon: '⚙️' },
    { name: 'op-geth Updates State', description: 'op-geth computes the new L2 state root after execution and prepares state changes.', icon: '🔄' },
    { name: 'Sequencer Batches & Posts', description: 'The Sequencer bundles this and other L2 transactions into a batch and posts the data to Ethereum L1.', icon: '➡️' },
    { name: 'L1 Finalization / Challenge', description: 'The L1 receives the batch. After a dispute window, it\'s finalized (or challenged via fraud proof).', icon: '🏁' },
    { name: 'Interaction Cycle Complete', description: 'The full cycle of sequencer and op-geth interaction for a transaction is complete.', icon: '✅' },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [currentDescription, setCurrentDescription] = useState(interactionSteps[0].description);
  const [message, setMessage] = useState('Click "Start Interaction" to simulate Sequencer-op-geth interaction.');

  const handleStartInteraction = () => {
    setCurrentStep(0);
    setCurrentDescription(interactionSteps[0].description);
    setMessage(`Starting: ${interactionSteps[0].name}`);
  };

  const handleNextStep = () => {
    if (currentStep < interactionSteps.length - 1) {
      const nextIndex = currentStep + 1;
      setCurrentStep(nextIndex);
      setCurrentDescription(interactionSteps[nextIndex].description);
      setMessage(`Processing: ${interactionSteps[nextIndex].name}`);
    } else {
      setMessage("Interaction cycle visualization complete. Reset to restart.");
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCurrentDescription(interactionSteps[0].description);
    setMessage('Interaction reset. Click "Start Interaction" to begin again.');
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-ayu-accent-orange">op-geth: Sequencer Interaction (Interactive)</h2>
      <p className="text-ayu-fg-muted mb-6 leading-relaxed text-sm sm:text-base">
        This interactive explainer illustrates the vital interaction between the Optimism Sequencer
        and op-geth, which is fundamental to how transactions are processed on the Optimism Layer 2 blockchain.
      </p>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border mb-6 flex-grow">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Interaction Flow:</h3>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4">
          {interactionSteps.map((step, index) => (
            <div key={index} className={`flex flex-col items-center text-center p-2 sm:p-4 rounded-lg border-2
              ${index === currentStep ? 'bg-ayu-accent-blue border-ayu-accent-blue text-ayu-bg-primary' : 'bg-ayu-bg-secondary border-ayu-border text-ayu-fg opacity-70'}
              transition-all duration-300 ease-in-out w-24 h-24 sm:w-28 sm:h-28`}>
              <span className="text-2xl sm:text-3xl mb-1">{step.icon}</span>
              <p className="text-xs sm:text-sm font-bold">{step.name}</p>
            </div>
          ))}
        </div>
        <p className="text-base sm:text-lg font-bold text-ayu-accent-blue text-center mt-5">{message}</p>

        <div className="mt-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Current Step Details:</h3>
          <p className="text-ayu-fg leading-relaxed text-sm sm:text-base">{currentDescription}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button onClick={handleStartInteraction} disabled={currentStep > 0 && currentStep < interactionSteps.length - 1} className="flex-1 btn-primary hover:btn-primary-hover text-ayu-bg-primary font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed">Start Interaction</button>
          <button onClick={handleNextStep} disabled={currentStep >= interactionSteps.length - 1} className="flex-1 btn-secondary hover:btn-secondary-hover text-ayu-bg-primary font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-green focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed">Next Step</button>
          <button onClick={handleReset} className="flex-1 btn-danger hover:btn-danger-hover text-ayu-bg-primary font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-red focus:ring-opacity-75">Reset</button>
        </div>
      </div>
    </div>
  );
};

const OpGethDataAvailabilityPage = () => {
  const dataAvailabilityStages = [
    { name: 'L2 Tx Initiated', description: 'User sends a transaction on Layer 2 (Optimism).', icon: '📝' },
    { name: 'Seq Processes & Batches', description: 'The Sequencer processes the L2 transactions and groups them into batches.', icon: '📑' },
    { name: 'Data Posted to L1', description: 'The batched L2 transaction data is compressed and posted as `calldata` to a smart contract on Layer 1 (Ethereum).', icon: '🔗' },
    { name: 'Data Accessible on L1', description: 'Once on L1, the data is publicly accessible to anyone. This is crucial for security.', icon: '👁️' },
    { name: 'Verifiers Reconstruct State', description: 'Independent verifiers (like op-geth nodes) can read this L1 data and independently reconstruct the L2 state.', icon: '🏗️' },
    { name: 'Fraud Proof Window Active', description: 'A time window (e.g., 7 days) begins. If a verifier finds a discrepancy, they can submit a fraud proof.', icon: '⏰' },
    { name: 'L2 State Finalized', description: 'If no valid fraud proof is submitted within the window, the L2 state is confirmed as final on L1.', icon: '✅' },
  ];

  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [currentDescription, setCurrentDescription] = useState(dataAvailabilityStages[0].description);
  const [message, setMessage] = useState('Click "Start Data Flow" to visualize Optimistic Rollup Data Availability.');

  const handleStartDataFlow = () => {
    setCurrentStageIndex(0);
    setCurrentDescription(dataAvailabilityStages[0].description);
    setMessage(`Starting: ${dataAvailabilityStages[0].name}`);
  };

  const handleNextStep = () => {
    if (currentStageIndex < dataAvailabilityStages.length - 1) {
      const nextIndex = currentStageIndex + 1;
      setCurrentStageIndex(nextIndex);
      setCurrentDescription(dataAvailabilityStages[nextIndex].description);
      setMessage(`Progressing to: ${dataAvailabilityStages[nextIndex].name}`);
    } else {
      setMessage("Data availability visualization complete. Reset to restart.");
    }
  };

  const handleReset = () => {
    setCurrentStageIndex(0);
    setCurrentDescription(dataAvailabilityStages[0].description);
    setMessage('Visualization reset. Click "Start Data Flow" to begin again.');
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-ayu-accent-orange">op-geth: Data Availability (Interactive)</h2>
      <p className="text-ayu-fg-muted mb-6 leading-relaxed text-sm sm:text-base">
        Understand how Optimistic Rollups ensure that all Layer 2 transaction data is available on
        Layer 1. This is critical for the security model, enabling anyone to reconstruct the L2 state
        and submit fraud proofs if needed.
      </p>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border mb-6 flex-grow">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Data Flow:</h3>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4">
          {dataAvailabilityStages.map((stage, index) => (
            <div key={index} className={`flex flex-col items-center text-center p-2 sm:p-4 rounded-lg border-2
              ${index === currentStageIndex ? 'bg-ayu-accent-blue border-ayu-accent-blue text-ayu-bg-primary' : 'bg-ayu-bg-secondary border-ayu-border text-ayu-fg opacity-70'}
              transition-all duration-300 ease-in-out w-24 h-24 sm:w-28 sm:h-28`}>
              <span className="text-2xl sm:text-3xl mb-1">{stage.icon}</span>
              <p className="text-xs sm:text-sm font-bold">{stage.name}</p>
            </div>
          ))}
        </div>
        <p className="text-base sm:text-lg font-bold text-ayu-accent-blue text-center mt-5">{message}</p>

        <div className="mt-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Current Step Details:</h3>
          <p className="text-ayu-fg leading-relaxed text-sm sm:text-base">{currentDescription}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button onClick={handleStartDataFlow} disabled={currentStageIndex > 0 && currentStageIndex < dataAvailabilityStages.length - 1} className="flex-1 btn-primary hover:btn-primary-hover text-ayu-bg-primary font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed">Start Data Flow</button>
          <button onClick={handleNextStep} disabled={currentStageIndex >= dataAvailabilityStages.length - 1} className="flex-1 btn-secondary hover:btn-secondary-hover text-ayu-bg-primary font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-green focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed">Next Step</button>
          <button onClick={handleReset} className="flex-1 btn-danger hover:btn-danger-hover text-ayu-bg-primary font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-red focus:ring-opacity-75">Reset</button>
        </div>
      </div>
    </div>
  );
};

// Polygon PoS Pages
const PolygonPoSBorPage = () => (
  <div className="flex flex-col h-full items-center justify-center text-center">
    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-ayu-accent-orange">Polygon PoS: Bor</h2>
    <p className="text-ayu-fg-muted mb-6 leading-relaxed max-w-full sm:max-w-2xl text-sm sm:text-base">
      Bor is the **EVM-compatible blockchain** layer of Polygon PoS. It's where the actual
      Ethereum-compatible transactions are executed, and blocks are produced. It functions much
      like the execution layer of Ethereum clients (like Geth or op-geth), processing smart
      contract calls, managing accounts, and maintaining the chain's state. Validators chosen by
      Heimdall propose and produce blocks on Bor.
    </p>
    <ul className="mt-4 text-left mx-auto max-w-full sm:max-w-xl list-disc list-inside text-ayu-fg text-sm sm:text-base">
      <li className="mb-2">Transaction execution and block production.</li>
      <li className="mb-2">Maintains EVM state and executes smart contracts.</li>
      <li className="mb-2">Equivalent to Ethereum's execution layer.</li>
      <li>Block producers are selected by Heimdall.</li>
    </ul>
  </div>
);

const PolygonPoSHeimdallPage = () => (
  <div className="flex flex-col h-full items-center justify-center text-center">
    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-ayu-accent-orange">Polygon PoS: Heimdall</h2>
    <p className="text-ayu-fg-muted mb-6 leading-relaxed max-w-full sm:max-w-2xl text-sm sm:text-base">
      Heimdall is the **proof-of-stake consensus layer** of Polygon PoS. It acts as the
      coordination layer for validators, managing staking, block producer selection on Bor,
      and checkpoints state to the Ethereum mainnet. It's built on a modified version of Tendermint.
      Heimdall ensures the security and decentralization of the Polygon network by enforcing
      validator rules and coordinating the block production process.
    </p>
    <ul className="mt-4 text-left mx-auto max-w-full sm:max-w-xl list-disc list-inside text-ayu-fg text-sm sm:text-base">
      <li className="mb-2">Manages validator set and staking.</li>
      <li className="mb-2">Selects block producers for Bor.</li>
      <li className="mb-2">Creates checkpoints on Ethereum.</li>
      <li>Ensures network security and coordination.</li>
    </ul>
  </div>
);

// Succinct SP1 Pages
const SuccinctSP1DetailedPage = () => {
  const sp1Stages = [
    { name: 'Write Rust Program', description: 'Develop your application logic in Rust. This program defines the computation you want to prove.', icon: '📝' },
    { name: 'Compile to RISC-V ELF', description: 'The Rust program is compiled into a RISC-V executable (ELF file). SP1 uses RISC-V as its underlying instruction set architecture, ensuring compatibility and efficiency for ZKP generation.', icon: '⚙️' },
    { name: 'SP1 Prover (Execution & Trace)', description: 'The SP1 Prover executes the RISC-V program within its specialized environment. During execution, it meticulously records all intermediate values and operations, generating a comprehensive "execution trace." This trace serves as the basis for proof generation.', icon: '💻' },
    { name: 'Proof Generation (STARK)', description: 'From the execution trace, the SP1 Prover generates a compact, cryptographically secure STARK (Scalable Transparent ARgument of Knowledge) proof. This proof attests to the correct execution of the program without revealing the entire trace.', icon: '🔐' },
    { name: 'Proof & Outputs to L1', description: 'The generated ZK-proof, along with any public outputs from the Rust program, are then submitted to a dedicated verification smart contract on Layer 1 (Ethereum). This step makes the proof verifiable on the blockchain.', icon: '⬆️' },
    { name: 'L1 Verification', description: 'The L1 smart contract cryptographically verifies the submitted STARK proof. A successful verification confirms that the Rust program was executed correctly and honestly, without revealing any private inputs used in the computation.', icon: '✅' },
    { name: 'Recursion (Optional)', description: 'For very large or complex computations, multiple proofs can be recursively combined into a single, even smaller proof. This recursion further reduces on-chain verification costs and time, making proving more efficient for extensive operations.', icon: '♻️' },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev + 1) % sp1Stages.length);
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-ayu-accent-orange">Succinct SP1: Detailed Overview (Interactive)</h2>
      <p className="text-ayu-fg-muted mb-6 leading-relaxed text-sm sm:text-base">
        Succinct's SP1 is a performant and developer-friendly ZKP toolkit that enables proving
        arbitrary Rust programs. This interactive guide walks through the key stages of generating
        and verifying a ZK-proof with SP1.
      </p>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border mb-6 flex-grow">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">SP1 Proof Generation Flow:</h3>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4">
          {sp1Stages.map((stage, index) => (
            <div key={index} className={`flex flex-col items-center text-center p-2 sm:p-4 rounded-lg border-2
              ${index === currentStep ? 'bg-ayu-accent-blue border-ayu-accent-blue text-ayu-bg-primary' : 'bg-ayu-bg-secondary border-ayu-border text-ayu-fg opacity-70'}
              transition-all duration-300 ease-in-out w-24 h-24 sm:w-28 sm:h-28`}>
              <span className="text-2xl sm:text-3xl mb-1">{stage.icon}</span>
              <p className="text-xs sm:text-sm font-bold">{stage.name}</p>
            </div>
          ))}
        </div>
        <p className="text-base sm:text-lg font-bold text-ayu-accent-blue text-center mt-5">
          Current Stage: {sp1Stages[currentStep].name}
        </p>

        <div className="mt-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Details:</h3>
          <p className="text-ayu-fg leading-relaxed text-sm sm:text-base">{sp1Stages[currentStep].description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button onClick={handleNextStep} className="flex-1 btn-primary hover:btn-primary-hover font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75">Next Stage</button>
          <button onClick={handleReset} className="flex-1 btn-danger hover:btn-danger-hover text-ayu-bg-primary font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-red focus:ring-opacity-75">Reset</button>
        </div>
      </div>
    </div>
  );
};

// Miden VM Pages
const MidenVMDetailedPage = () => {
  const [initialStackMiden, setInitialStackMiden] = useState([10, 20]);
  const [midenStackAction, setMidenStackAction] = useState(null);
  const [midenStackArgs, setMidenStackArgs] = useState(0);

  const [initialMemoryMiden, setInitialMemoryMiden] = useState({ '0:0': 100, '0:1': 200 });
  const [midenMemoryAction, setMidenMemoryAction] = useState(null);
  const [midenMemoryAddress, setMidenMemoryAddress] = useState([0, 2]);
  const [midenMemoryValue, setMidenMemoryValue] = useState(300);

  const showAlert = (message) => { // This local showAlert is used for Miden, separate from App's global alert
    // In a real app, you might want to lift this state or use a context.
    // For this demo, we'll just log or show a simple inline message.
    console.log("Miden Alert:", message);
    // For this example, we won't use the global AlertDialog, keeping it simple.
  };

  const handleMidenStackAction = (action, args = 0) => {
    setMidenStackAction(action);
    setMidenStackArgs(args);
    // For immediate effect in visualization (component will re-render on prop change)
    if (action === "add") {
      setInitialStackMiden(prev => {
        if (prev.length >= 2) {
          const b = prev.pop();
          const a = prev.pop();
          return [...prev, a + b];
        }
        showAlert("Miden Stack: Not enough elements to ADD!");
        return prev;
      });
    } else if (action === "dup") {
      setInitialStackMiden(prev => {
        if (prev.length > args) {
          const valueToDup = prev[prev.length - 1 - args];
          return [...prev, valueToDup];
        }
        showAlert(`Miden Stack: Not enough elements to DUP.${args}!`);
        return prev;
      });
    }
  };

  const handleMidenMemoryStore = () => {
    const addressKey = `${midenMemoryAddress[0]}:${midenMemoryAddress[1]}`;
    setInitialMemoryMiden(prev => ({
      ...prev,
      [addressKey]: midenMemoryValue
    }));
    setMidenMemoryAction("store");
    showAlert(`Miden Memory: Stored ${midenMemoryValue} at address ${addressKey}`);
  };

  const handleMidenMemoryLoad = () => {
    const addressKey = `${midenMemoryAddress[0]}:${midenMemoryAddress[1]}`;
    setMidenMemoryAction("load");
    const loadedValue = initialMemoryMiden[addressKey];
    if (loadedValue !== undefined) {
      showAlert(`Miden Memory: Loaded ${loadedValue} from address ${addressKey}`);
    } else {
      showAlert(`Miden Memory: Address ${addressKey} is empty.`);
    }
  };

  // Inline Stack Visualizer for Miden
  const StackVisualizerMiden = ({ stack }) => (
    <div className="flex flex-row-reverse items-end gap-2 min-h-[50px] p-2 border border-ayu-border rounded-md bg-ayu-bg-secondary overflow-x-auto justify-start">
      {stack.length === 0 ? (
        <p className="text-ayu-fg-muted">Stack is Empty</p>
      ) : (
        stack.map((item, index) => (
          <div key={index} className="bg-ayu-accent-blue text-ayu-bg-primary px-3 py-2 rounded-md font-bold flex-shrink-0">
            {item}
          </div>
        ))
      )}
    </div>
  );

  // Inline Memory Visualizer for Miden
  const MemoryVisualizerMiden = ({ memory, highlightAddress }) => {
    const displayMemory = Object.entries(memory).sort(([aKey], [bKey]) => {
      const [aPage, aWord] = aKey.split(':').map(Number);
      const [bPage, bWord] = bKey.split(':').map(Number);
      if (aPage !== bPage) return aPage - bPage;
      return aWord - bWord;
    });

    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-2 bg-ayu-bg-secondary p-3 rounded-md border border-ayu-border">
        {displayMemory.length === 0 ? (
          <p className="col-span-full text-ayu-fg-muted text-center">Memory is Empty</p>
        ) : (
          displayMemory.map(([key, val]) => {
            const [page, word] = key.split(':');
            const isHighlighted = highlightAddress && parseInt(page) === highlightAddress[0] && parseInt(word) === highlightAddress[1];
            return (
              <div key={key} className={`p-2 rounded-md border border-ayu-border text-center ${isHighlighted ? 'bg-ayu-accent-green text-ayu-bg-primary' : 'bg-ayu-bg-tertiary text-ayu-fg'}`}>
                <span className="text-xs text-ayu-fg-muted block">P{page}:W{word}</span><br/>
                <span className="text-base sm:text-lg">{val}</span>
              </div>
            );
          })
        )}
      </div>
    );
  };


  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-ayu-accent-orange">Miden VM: Detailed Overview (Interactive)</h2>
      <p className="text-ayu-fg-muted mb-6 leading-relaxed text-sm sm:text-base">
        Miden VM is a STARK-based ZK-friendly virtual machine. It uses a different execution model
        compared to EVM, with features like a persistent memory model, a more structured stack,
        and a focus on provability for ZK-rollups.
      </p>

      <div className="bg-ayu-bg-tertiary p-4 sm:p-6 rounded-lg shadow-inner border border-ayu-border mb-6 flex-grow">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Miden Stack:</h3>
        <p className="text-ayu-fg-muted mb-3 text-sm sm:text-base">Miden's stack is crucial for computations, similar to EVM's, but with explicit operations for manipulating deep stack elements.</p>
        <StackVisualizerMiden stack={initialStackMiden} />
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button onClick={() => handleMidenStackAction('add')} className="flex-1 btn-primary hover:btn-primary-hover font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75">ADD</button>
          <button onClick={() => handleMidenStackAction('dup', 0)} className="flex-1 btn-primary hover:btn-primary-hover font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75">DUP.0</button>
          <button onClick={() => handleMidenStackAction('dup', 1)} className="flex-1 btn-primary hover:btn-primary-hover font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75">DUP.1</button>
        </div>

        <h3 className="mt-8 text-lg sm:text-xl font-semibold mb-3 text-ayu-accent-green">Miden Memory:</h3>
        <p className="text-ayu-fg-muted mb-3 text-sm sm:text-base">Miden VM features a memory model with pages and word addresses, allowing persistent storage within a single program execution.</p>
        <MemoryVisualizerMiden memory={initialMemoryMiden} highlightAddress={midenMemoryAddress} />
        <div className="flex flex-col sm:flex-row items-end gap-4 mt-4">
          <div className="flex-1 w-full">
            <label htmlFor="midenMemPage" className="block text-ayu-fg text-sm font-bold mb-2">Memory Page (0-15):</label>
            <input
              id="midenMemPage"
              type="number"
              value={midenMemoryAddress[0]}
              onChange={(e) => setMidenMemoryAddress([parseInt(e.target.value), midenMemoryAddress[1]])}
              min="0" max="15" className="shadow appearance-none border rounded w-full py-2 px-3 text-ayu-bg-primary leading-tight focus:outline-none focus:shadow-outline bg-ayu-fg"
            />
          </div>
          <div className="flex-1 w-full">
            <label htmlFor="midenMemWord" className="block text-ayu-fg text-sm font-bold mb-2">Memory Word (0-15):</label>
            <input
              id="midenMemWord"
              type="number"
              value={midenMemoryAddress[1]}
              onChange={(e) => setMidenMemoryAddress([midenMemoryAddress[0], parseInt(e.target.value)])}
              min="0" max="15" className="shadow appearance-none border rounded w-full py-2 px-3 text-ayu-bg-primary leading-tight focus:outline-none focus:shadow-outline bg-ayu-fg"
            />
          </div>
          <div className="flex-1 w-full">
            <label htmlFor="midenMemValue" className="block text-ayu-fg text-sm font-bold mb-2">Value:</label>
            <input
              id="midenMemValue"
              type="number"
              value={midenMemoryValue}
              onChange={(e) => setMidenMemoryValue(parseInt(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-ayu-bg-primary leading-tight focus:outline-none focus:shadow-outline bg-ayu-fg"
            />
          </div>
          <div className="flex w-full sm:w-auto gap-3 mt-4 sm:mt-0">
            <button onClick={handleMidenMemoryStore} className="flex-1 btn-primary hover:btn-primary-hover font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-orange focus:ring-opacity-75">MSTORE</button>
            <button onClick={handleMidenMemoryLoad} className="flex-1 btn-secondary hover:btn-secondary-hover font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-ayu-accent-green focus:ring-opacity-75">MLOAD</button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default App;
