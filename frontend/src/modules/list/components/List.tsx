import { ShipmentInterface } from "../shipment.interface";
import { List as BaseList } from "../../../components/List";
import { Input } from "../../../components/Input";
import { Row } from "../../../components/Row";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { Text } from '../../../components/Text';
import { ReactComponent as Sort } from '../../../icons/sort.svg'
import { Pagination } from '../../../components/Pagination';
import React from 'react';

export const List: React.FC<{
  shipments?: ShipmentInterface[]
  pagination: {
    pageNumber: number,
    offset: number,
    itemsCount: number,
    pagesCount: number
  },
  onChangePage(selectedPage: number): void,
  openShipment(shipment: ShipmentInterface): void,
  onChangeSearch(e: React.ChangeEvent<HTMLInputElement>): void,
}> = (props) =>
<BaseList>
  <Row marginBottom>
    <Input onChange={props.onChangeSearch} placeholder={'Search by ID'} marginRight/>
    <Button icon={Sort} onClick={() => ({})}>Sort</Button>
  </Row>
  {
    props.shipments && !!props.shipments.length && 
    <>
      { 
        props.shipments.map(
          shipment =>
          <Card 
            onClick={() => props.openShipment(shipment)} key={shipment.id}
            marginBottom
          >
            <Text small primary>{shipment.status}</Text>
            <Text big>{shipment.name} <Text small bold secondary inline># {shipment.id}</Text></Text>
            <Text small>From <Text bold inline>{shipment.origin}</Text> to <Text bold inline>{shipment.destination}</Text></Text>
          </Card>
        )
      }
      <Pagination 
        pageCount={props.pagination.pagesCount} 
        currentPage={props.pagination.pageNumber}
        onChangePage={props.onChangePage}
      />
    </>
  }
</BaseList>
