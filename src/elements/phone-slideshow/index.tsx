import PhoneItem from '@elements/phone-item';
import './style.scss';

interface PhoneSlideShowProps {
  data: PhoneList;
}

const PhoneSlideShow = ({ data }: PhoneSlideShowProps) => {
  return (
    <div className="phone-list-slideshow">
      <div className="phone-list-slideshow-overflow">
        {data?.map((phone, index) => (
          <PhoneItem
            itemInfo={phone}
            key={`PHONE_ITEM_SLIDESHOW_${phone.id}_${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhoneSlideShow;
