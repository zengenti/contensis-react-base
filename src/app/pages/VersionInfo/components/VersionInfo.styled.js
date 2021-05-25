import styled from 'styled-components';

export const VersionInfoStyledTable = styled.table`
  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
  font-size: 1.6rem;
  line-height: 1.5rem;
  border-bottom: 4px solid #8892bf;
  border-collapse: separate;
  margin: 0 auto;
  width: 80%;
  th {
    text-align: left;
    background-color: #c4c9df;
    border-bottom: #8892bf 2px solid;
    border-bottom-color: #8892bf;
    border-top: 20px solid #fff;
  }
  td {
    border-bottom: 1px solid #eee;
  }
  td,
  th {
    padding: 0.5rem 0.75rem;
    vertical-align: top;
  }
  .left {
    width: 25%;
  }
  tr th {
    border-right: hidden;
    border-spacing: 0 15px;
  }
  .green {
    background-color: #9c9;
    border-bottom: 1px solid #696;
  }
  .red {
    background-color: #c99;
    border-bottom: 1px solid #966;
  }
  .small {
    font-size: 100%;
    line-height: 2.4rem;
  }
`;
