import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    { id: 1, text: 'This item is from context', rating: 10 },
    { id: 2, text: '2This item is from context', rating: 10 },
    { id: 3, text: '3This item is from context', rating: 10 },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    editMode: false,
  });

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      // whatever we pass into set feedback overwrites
      // returns an array minus the one we delete
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  //   Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      editMode: true,
    });
  };

  //   Update feedback item

  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };

  const addFeedback = (newFeedback) => {
    // this adds an ID to each feedback
    newFeedback.id = uuidv4();
    // taking all objects already in feedback and adding them into array along with new feedback at front
    setFeedback([newFeedback, ...feedback]);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        // feedbackEdit is the state that holds item and boolean
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        // edit feedback is function
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
