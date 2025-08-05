"use client";

import React from "react";
import styled from "styled-components";

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const DialogBox = styled.div`
  background: #1c162f;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);

  h2 {
    margin-top: 0;
    color: #fff;
  }

  p {
    color: #b0a8d9;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  background: ${({ $primary }) =>
    $primary ? "linear-gradient(45deg, #8a2be2, #4a0d67)" : "#3d325a"};
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

interface SaveGameDialogProps {
  onSave: () => void;
  onDontSave: () => void;
  onCancel: () => void;
}

const SaveGameDialog: React.FC<SaveGameDialogProps> = ({
  onSave,
  onDontSave,
  onCancel,
}) => {
  return (
    <DialogOverlay>
      <DialogBox>
        <h2>Save Tournament?</h2>
        <p>Would you like to save this tournament to your history?</p>
        <ButtonGroup>
          <Button $primary onClick={onSave}>
            Save and Start New
          </Button>
          <Button onClick={onDontSave}>Start New (Don&apos;t Save)</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </ButtonGroup>
      </DialogBox>
    </DialogOverlay>
  );
};

export default SaveGameDialog;
