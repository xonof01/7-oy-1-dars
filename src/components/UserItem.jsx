import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';
const { Meta } = Card;

const UserItem = ({ item, handleLikedBtnClick, handleSavedBtnClick }) => (
  <Card
    style={{ width: 300, borderColor: item.isLiked ? 'red' : item.isSaved ? 'blue' : '#ddd' }}
    cover={<img alt="img" src={item.image} />}
    actions={[
      <HeartOutlined
        onClick={handleLikedBtnClick}
        style={{ color: item.isLiked ? 'red' : 'gray' }}
        className="scale-[1.2]"
      />,
      <ShoppingCartOutlined
        onClick={handleSavedBtnClick}
        style={{ color: item.isSaved ? 'blue' : 'gray' }}
        className="scale-[1.2]"
      />
    ]}
  >
    <Meta
      title={`${item.firstName} - ${item.lastName}`}
      description={item.email}
    />
  </Card>
);

export default UserItem;
