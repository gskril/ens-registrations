import styled, { css } from 'styled-components'

export const Table = styled.div`
  width: 100%;
  overflow: hidden;
  margin: 1rem 0;
  border-radius: 0.5rem;
  border: 2px solid rgb(251, 245, 245);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 8px 15px;
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
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.875rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: #fbfbfb;
  border-bottom: 1px solid rgb(230, 210, 210);
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
    border-bottom: 1px solid rgb(230, 210, 210);
  }
`
