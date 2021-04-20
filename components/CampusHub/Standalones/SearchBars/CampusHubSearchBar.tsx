import Link from 'next/link'
import Select, {
  Props as SelectProps,
  OptionProps,
  createFilter,
} from 'react-select'
import {
  HyperlinkedSearchOption,
  HyperlinkedSearchOptionGroup,
} from '@/interfaces/search-options'

type OptionType = HyperlinkedSearchOption
type OptionGroupType = HyperlinkedSearchOptionGroup

type Props = SelectProps<OptionType, boolean, OptionGroupType>

const Option: React.VFC<OptionProps<OptionType, boolean, OptionGroupType>> = (
  props
) => {
  const { data: rawData, children, innerRef, innerProps } = props
  const data = rawData as HyperlinkedSearchOption
  return (
    <div ref={innerRef} {...innerProps}>
      <Link href={data.link || '#'}>
        <a className="block p-2 text-base hover:text-white hover:bg-usafa-blue">
          {children}
        </a>
      </Link>
    </div>
  )
}

const CampusHubSearchBar: React.VFC<Props> = (props) => {
  return (
    <Select
      isClearable={true}
      isSearchable={true}
      filterOption={createFilter({
        ignoreAccents: true,
        ignoreCase: true,
        matchFrom: 'any',
        trim: true,
      })}
      components={{ Option }}
      {...props}
    />
  )
}

export default CampusHubSearchBar
