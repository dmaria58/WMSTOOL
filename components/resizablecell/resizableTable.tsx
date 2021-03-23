import * as React from "react";
import { Resizable } from "react-resizable";

export const resizableColumnsTableWrapper = (TableComponent: any) => {
  interface ResizableColumnsProps {
    columns?: Array<any>;
  }
  interface ResizableColumnsState {
    columns: Array<any>;
  }
  return class ResizableColumns extends React.Component<ResizableColumnsProps,ResizableColumnsState> {
    constructor(props: ResizableColumnsProps) {
      super(props);
      this.state = {
        columns: props.columns?props.columns:[],
      };
    }
    resizableTitle = (props: any) => {
      const { onResize, width, ...restProps } = props;
      if (!width) {
        return <th {...restProps} />;
      }
      return (
        <Resizable
          width={width}
          height={0}
          onResize={onResize}
          draggableOpts={{ enableUserSelectHack: false }}
        >
          <th {...restProps} />
        </Resizable>
      );
    };
    components = {
      header: {
        cell: this.resizableTitle.bind(this),
      },
    };
    handleResize = (index: number,_e:React.SyntheticEvent<HTMLElement>,data:any) => {
      const {size}=data
      const { columns } = this.state;
      columns[index].width=size.width
      this.setState({columns})
    };
    render() {
      const { ...restProps } = this.props;
      const { columns } = this.state;
      const newColumns = columns.map((col: any, index: number) => ({
        ...col,
        onHeaderCell: (column: any) => ({
          width: column.width,
          onResize:this.handleResize.bind(this,index)
        }),
      }));
      return (
        <TableComponent
          {...restProps}
          columns={newColumns}
          components={this.components}
          className="resizable-table-columns"
        />
      );
    }
  };
};


