import re

def input_format(string):
  trimmed = string.strip()
  regex = re.compile("<.*?>")
  cleantext = re.sub(regex, '', trimmed) # remove html tag to prevent injection
  return cleantext

# used in messages on event board
def get_tagged_name(string):
  regex = re.compile("@([^\s]*)(\s+|$)")
  return [x.group(1) for x in re.finditer(regex, string)]

def is_all_chinese(strs):
  for _char in strs:
    if not '\u4e00' <= _char <= '\u9fa5':
      return False
  return True