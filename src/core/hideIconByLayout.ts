const hideIconByLayout = (layout, component: ComponentNode) => {
  const icon = component.findOne(n => n.name.includes('Icon'));

  if (layout === 'WITHOUT_ICON') {
    icon.visible = false;
  }

  if (layout === 'WITH_ICON') {
    icon.visible = true;
  }

  return component;
}

export default hideIconByLayout;
