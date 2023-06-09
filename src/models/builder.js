function courtFilterBuilder(
  districtId,
  date,
  time,
  parkingId,
  rentalEquip,
  showerFacility,
  hasAmenities,
  courtTypeId,
  courtId
) {
  let conditionArr = [];

  if (districtId) {
    let districtArr = [];
    districtArr.push(districtId);
    conditionArr.push(`c.district_id IN (${districtArr.join(',')})`);
  }

  if (!time && date) {
    let dateArr = [];
    dateArr.push(date);
    conditionArr.push(
      `(DATE(t.time_slot) ='${dateArr}' AND t.is_available = 1)`
    );
  }

  if (time && date) {
    let dateTimeArr = [];
    dateTimeArr.push(date.substr(0, date.length) + ' ' + time.substr(0));
    conditionArr.push(
      `(t.time_slot ='${[dateTimeArr]}' AND t.is_available = 1)`
    );
  }

  if (parkingId) {
    let parkingArr = [];
    parkingArr.push(parkingId);
    conditionArr.push(`c.parking_id = ${parkingId}`);
  }

  if (rentalEquip) {
    conditionArr.push(`c.rental_equip = ${rentalEquip}`);
  }

  if (showerFacility) {
    conditionArr.push(`c.shower_facility = ${showerFacility}`);
  }

  if (hasAmenities) {
    conditionArr.push(`c.has_amenities = ${hasAmenities}`);
  }

  if (courtTypeId) {
    let courtTypeArr = [];
    courtTypeArr.push(courtTypeId);
    conditionArr.push(`c.court_type_id = ${courtTypeId}`);
  }

  if (courtId) {
    conditionArr.push(`c.id = ${courtId}`);
  }

  let whereCondition = '';
  if (conditionArr.length > 0) {
    whereCondition = `WHERE ${conditionArr.join(' AND ')}`;
  }
  return whereCondition;
}

function matchFilterBuilder(date) {
  let conditionArr = [];

  if (date) {
    conditionArr.push(` AND (DATE(r.time_slot) = '${date}')`);
  }

  let whereCondition = '';
  if (conditionArr.length > 0) {
    whereCondition = `${conditionArr.join(' AND ')}`;
  }
  return whereCondition;
}

function dateBuilder(dateForCourt) {
  let conditionArr = [];

  if (dateForCourt) {
    conditionArr.push(` AND DATE(t.time_slot) ='${dateForCourt}'`);
  }

  let whereCondition = '';
  if (conditionArr.length > 0) {
    whereCondition = `${conditionArr.join(' AND ')}`;
  }
  return whereCondition;
}

function limitBuilder(page, limit) {
  if (!page) page = 1;

  if (!limit) limit = 20;

  let offset = (page - 1) * 20;

  return `LIMIT ${limit} OFFSET ${offset}`;
}

function orderByBuilder(orderBy) {
  let orderQuery = '';
  switch (orderBy) {
    case 'Asc':
      orderQuery = 'ORDER BY c.id ASC';
      break;
    case 'Desc':
      orderQuery = 'ORDER BY c.id DESC';
      break;
    default:
      orderQuery = 'ORDER BY c.id';
      break;
  }
  return orderQuery;
}

function reservationExpiredBuilder(isExpired) {
  if (parseInt(isExpired)) {
    return `AND r.time_slot < ?`;
  }

  return `AND r.time_slot > ?`;
}

module.exports = {
  courtFilterBuilder,
  matchFilterBuilder,
  limitBuilder,
  orderByBuilder,
  reservationExpiredBuilder,
  dateBuilder,
};
