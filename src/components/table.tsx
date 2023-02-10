import styled, { css } from 'styled-components'

export const Table = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 0.25rem;
  border: 1px solid black;
`

const rowStyles = css`
  display: grid;
  gap: 1.25rem;
  font-weight: 600;
  padding: 0.75rem 1rem;
  grid-template-columns: 3fr 2fr;
`

export const TableHeader = styled.div`
  ${rowStyles}
  color: #fff;
  font-weight: 800;
  font-size: 0.875rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: #333;
  border-bottom: 1px solid black;
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
    border-bottom: 0.0625rem solid #333;
  }
`
