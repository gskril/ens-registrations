import styled, { css } from 'styled-components'

export const Table = styled.div`
  width: 100%;
  overflow: hidden;
  margin: 1rem 0;
  border-radius: 0.5rem;
  border: 2px solid #efeeee;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1),
  -5px -5px 10px rgba(255, 255, 255, 0.75); 
`

const rowStyles = css`
  display: grid;
  gap: 1.25rem;
  font-weight: 500;
  padding: 0.75rem 1rem;
  grid-template-columns: 3fr 2fr 2fr;
`

export const TableHeader = styled.div`
  ${rowStyles}
  color: #b69191;
  font-weight: 700;
  text-transform: uppercase;  font-weight: 700;
  font-size: 0.875rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgb(238, 227, 227);
  `

export const TableRow = styled.div`
  ${rowStyles}
  color: #333;

  span {
    overflow-x: hidden;
    overflow-y: visible;
    text-overflow: ellipsis;
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgb(238, 227, 227);
  } 
  
  &:not(:first-child) {
    border-top: 1px solid #fff;
  }
`
